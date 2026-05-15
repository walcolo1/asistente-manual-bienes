/**
 * section.service.js
 * Lee chunks.json y devuelve el detalle completo de una sección por su ID estable.
 * NO llama a Gemini.
 */

const fs   = require('fs');
const path = require('path');
const { buildSectionId } = require('./toc.service');

const CHUNKS_PATH = path.join(__dirname, '../../processed/chunks.json');

/**
 * Busca todos los chunks pertenecientes a la sección indicada por su ID estable.
 * @param {string} sectionId  ID estable generado por buildSectionId(chapter, section)
 * @returns {object|null}
 */
function getSectionById(sectionId) {
  const raw    = fs.readFileSync(CHUNKS_PATH, 'utf-8');
  const chunks = JSON.parse(raw);

  const matching = chunks.filter(chunk => {
    const chapter = (chunk.metadata?.chapter || 'Sin capítulo detectado').trim();
    const section = (chunk.metadata?.section || 'Sin sección detectada').trim();
    return buildSectionId(chapter, section) === sectionId;
  });

  if (matching.length === 0) return null;

  const first   = matching[0];
  const chapter = (first.metadata?.chapter || 'Sin capítulo detectado').trim();
  const section = (first.metadata?.section || 'Sin sección detectada').trim();
  const source  = first.metadata?.source  || 'manual.structured.md';

  // Unir contenido de todos los chunks de la sección
  const fullText = matching.map(c => c.content).join('\n\n');

  return {
    id: sectionId,
    chapter,
    section,
    source,
    chunks: matching.map(c => ({
      id:       c.id,
      content:  c.content,
      metadata: c.metadata,
    })),
    fullText,
  };
}

module.exports = { getSectionById };
