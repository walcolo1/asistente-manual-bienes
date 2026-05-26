/**
 * ask-section.controller.js
 *
 * POST /api/ask-section
 * Usa los chunks de una sección específica como contexto para Gemini.
 * NO usa search.service.js — el contexto viene directamente de section.service.js.
 *
 * Body: { sectionId: string, question?: string }
 * Response: { question, answer, sources, usedChunks }
 */

const sectionService = require('../services/section.service');
const llmService     = require('../services/llm.service');
const cacheService   = require('../services/cache.service');

const QUOTA_MSG      = 'Se alcanzó el límite temporal de consultas de IA. Intenta más tarde.';
const NOT_FOUND_MSG  = 'No se pudo cargar el contenido de esta sección.';

function buildExcerpt(content, maxLength = 260) {
  const compact = String(content || '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (compact.length <= maxLength) return compact;
  return `${compact.slice(0, maxLength).replace(/\s+\S*$/, '')}...`;
}

async function askSection(req, res) {
  try {
    const { sectionId, question } = req.body;

    if (!sectionId || typeof sectionId !== 'string') {
      return res.status(400).json({ error: 'El campo sectionId es obligatorio.' });
    }

    // 1. Obtener datos de la sección (sin Gemini)
    const sectionData = sectionService.getSectionById(sectionId.trim());

    if (!sectionData || !sectionData.chunks || sectionData.chunks.length === 0) {
      return res.json({
        question: question || sectionId,
        answer:   NOT_FOUND_MSG,
        sources:  [],
        usedChunks: [],
      });
    }

    // 2. Construir pregunta efectiva si no se proporcionó una
    const effectiveQuestion = (question && question.trim())
      ? question.trim()
      : `Explícame el contenido de la sección "${sectionData.section}" del ${sectionData.chapter}.`;

    // 3. Verificar caché (clave = sectionId + pregunta)
    const cacheKey = `section:${sectionId}::${effectiveQuestion}`;
    const cached   = cacheService.get(cacheKey);
    if (cached) {
      console.log(`[AskSection] Cache hit para: "${effectiveQuestion}"`);
      return res.json({ question: effectiveQuestion, ...cached, fromCache: true });
    }

    // 4. Construir chunks compatibles con llmService.generateAnswer
    //    (necesita: chunk.content, chunk.metadata.chapter, chunk.metadata.section)
    const contextChunks = sectionData.chunks.map(c => ({
      id:       c.id,
      score:    1,           // score máximo porque es contexto directo
      content:  c.content,
      metadata: {
        chapter: sectionData.chapter,
        section: sectionData.section,
        source:  sectionData.source,
      },
    }));

    console.log(`[AskSection] Pregunta: "${effectiveQuestion}" | Sección: "${sectionData.section}" | Chunks: ${contextChunks.length}`);

    // 5. Llamar a Gemini con el contexto de la sección
    const answer = await llmService.generateAnswer(effectiveQuestion, contextChunks);

    // 6. Construir sources y usedChunks para el frontend
    const sources = [{
      chapter: sectionData.chapter,
      section: sectionData.section,
      source:  sectionData.source,
    }];

    const usedChunks = contextChunks.map(c => ({
      id:    c.id,
      score: c.score,
      excerpt: buildExcerpt(c.content),
      metadata: {
        chapter: sectionData.chapter,
        section: sectionData.section,
        source:  sectionData.source,
      },
    }));

    // 7. Guardar en caché
    cacheService.set(cacheKey, { answer, sources, usedChunks });

    return res.json({ question: effectiveQuestion, answer, sources, usedChunks });

  } catch (err) {
    if (err.isQuotaError) {
      console.warn('[AskSection] Cuota de Gemini excedida');
      return res.json({
        question: req.body?.question || req.body?.sectionId || '',
        answer:   QUOTA_MSG,
        sources:  [],
        usedChunks: [],
      });
    }

    console.error('[AskSection] Error inesperado:', err.message);
    return res.status(500).json({ error: err.message || 'Error interno al procesar la sección.' });
  }
}

module.exports = { askSection };
