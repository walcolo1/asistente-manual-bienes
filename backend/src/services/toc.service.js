/**
 * toc.service.js
 * Lee chunks.json y construye la tabla de contenido jerárquica.
 * NO llama a Gemini. Lee solo del sistema de archivos local.
 */

const fs   = require('fs');
const path = require('path');

const CHUNKS_PATH = path.join(__dirname, '../../processed/chunks.json');

// ── Utilidades ────────────────────────────────────────────────────────────────

/**
 * Normaliza una cadena para generar IDs estables:
 * - minúsculas, sin tildes, no alfanuméricos → guión
 */
function normalizeToId(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Genera un ID estable combinando capítulo + sección. */
function buildSectionId(chapter, section) {
  const chapPart = normalizeToId(chapter || 'sin-capitulo');
  const secPart  = normalizeToId(section  || 'sin-seccion');
  return `${chapPart}__${secPart}`;
}

/** Extrae la numeración inicial para ordenamiento: "1.2.1 Bienes" → [1,2,1] */
function extractSectionOrder(section) {
  const match = section.match(/^([\d.]+)/);
  if (!match) return [Infinity];
  return match[1].split('.').filter(Boolean).map(Number);
}

function compareSections(a, b) {
  const oa = extractSectionOrder(a.section);
  const ob = extractSectionOrder(b.section);
  for (let i = 0; i < Math.max(oa.length, ob.length); i++) {
    const na = oa[i] ?? 0;
    const nb = ob[i] ?? 0;
    if (na !== nb) return na - nb;
  }
  return 0;
}

// ── Resumen de capítulo sin Gemini ────────────────────────────────────────────

/** Quita prefijos Markdown de un título: "### 1.2 Foo" → "1.2 Foo" */
function stripMarkdown(text) {
  return (text || '').replace(/^#{1,7}\s*/, '').trim();
}

/** Sección de nivel principal: máximo 2 segmentos numéricos al inicio */
function isPrimarySection(title) {
  const parts = (title.match(/^[\d.]+/)?.[0] || '').split('.').filter(Boolean);
  return parts.length >= 1 && parts.length <= 2 && /^\d/.test(title);
}

/**
 * Genera un resumen de hasta 140 caracteres a partir de los títulos de
 * secciones principales del capítulo. Sin IA.
 */
function buildChapterSummary(sections) {
  const MAX   = 140;
  const DFLT  = 'Contenido general del capítulo según el Manual de Bienes.';

  if (!sections || sections.length === 0) return DFLT;

  // Limpiar markdown y filtrar secciones de nivel principal CON texto descriptivo
  const primary = sections
    .map(s => stripMarkdown(s.section))
    .filter(title => {
      if (!isPrimarySection(title)) return false;
      // Requiere que haya texto descriptivo (no solo números y puntos)
      const textPart = title.replace(/^[\d.\s]+/, '').trim();
      return textPart.length >= 3;
    })
    .slice(0, 6);

  const candidates = primary.length > 0
    ? primary
    : sections
        .map(s => stripMarkdown(s.section))
        .filter(t => t.replace(/^[\d.\s]+/, '').trim().length >= 3)
        .slice(0, 4);

  // Quitar número de prefijo, limpiar caracteres de control y normalizar espacios
  const labels = candidates
    .map(s => {
      let cleaned = s.replace(/^[\d.]+\s*/, '').trim();
      // Quitar caracteres no imprimibles, espacios dentro de palabras de OCR roto
      cleaned = cleaned
        .replace(/[\x00-\x1f]/g, '')      // control chars
        .replace(/\s{2,}/g, ' ')           // espacios múltiples → uno
        .replace(/[^\w\sáéíóúÁÉÍÓÚüÜñÑ.,:;()/-]/g, '') // solo caracteres legibles
        .trim();
      return cleaned;
    })
    .filter(l => {
      // Debe tener al menos 4 chars y ser mayormente letras (no números/símbolos solos)
      if (l.length < 4) return false;
      const letters = (l.match(/[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/g) || []).length;
      if (letters < 3) return false;
      // Detectar artefactos de OCR: palabras con un solo carácter aislado (ej: "CREACI Ó N")
      const words = l.trim().split(/\s+/);
      const singleCharCount = words.filter(w => w.length === 1 && /[A-ZÁÉÍÓÚa-záéíóú]/.test(w)).length;
      if (singleCharCount >= 2) return false; // más de un char aislado → artefacto OCR
      return true;
    });

  if (labels.length === 0) return DFLT;

  // Capitalizar primera letra
  const formatted = labels.map(l => l.charAt(0).toUpperCase() + l.slice(1));

  let summary = formatted.join(', ');
  if (summary.length > MAX) {
    summary = summary.slice(0, MAX - 1).replace(/,\s*[^,]*$/, '') + '.';
  } else if (!summary.endsWith('.')) {
    summary += '.';
  }

  return summary || DFLT;
}

// ── Caché en memoria ──────────────────────────────────────────────────────────
let _cache = null;

function buildTOC() {
  if (_cache) return _cache;

  const raw    = fs.readFileSync(CHUNKS_PATH, 'utf-8');
  const chunks = JSON.parse(raw);

  console.log('[TOC] chunks cargados:', chunks.length);

  const chaptersMap = new Map();

  for (const chunk of chunks) {
    const chapter = (chunk.metadata?.chapter || 'Sin capítulo detectado').trim();
    const section = (chunk.metadata?.section || 'Sin sección detectada').trim();
    const source  = chunk.metadata?.source || 'manual.structured.md';
    const chapId  = normalizeToId(chapter);

    if (!chaptersMap.has(chapId)) {
      chaptersMap.set(chapId, { id: chapId, chapter, sectionsMap: new Map() });
    }

    const chapEntry = chaptersMap.get(chapId);
    const sectionId = buildSectionId(chapter, section);

    if (!chapEntry.sectionsMap.has(sectionId)) {
      chapEntry.sectionsMap.set(sectionId, { id: sectionId, section, source, chunkIds: [] });
    }
    chapEntry.sectionsMap.get(sectionId).chunkIds.push(chunk.id);
  }

  // Orden: capítulos numerados primero, "Sin capítulo" al final
  const sorted = [...chaptersMap.entries()].sort(([, a], [, b]) => {
    const noA = a.chapter.toLowerCase().includes('sin cap');
    const noB = b.chapter.toLowerCase().includes('sin cap');
    if (noA && !noB) return 1;
    if (!noA && noB) return -1;
    return a.chapter.localeCompare(b.chapter, 'es');
  });

  const chapters = [];
  for (const [, chapEntry] of sorted) {
    const sections = [...chapEntry.sectionsMap.values()].sort(compareSections);
    const summary  = buildChapterSummary(sections);
    chapters.push({ id: chapEntry.id, chapter: chapEntry.chapter, summary, sections });
  }

  _cache = { chapters };
  console.log('[TOC] capítulos generados:', chapters.length);
  return _cache;
}

function invalidateCache() { _cache = null; }

module.exports = { buildTOC, buildSectionId, normalizeToId, invalidateCache };
