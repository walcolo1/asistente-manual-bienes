const searchService  = require('../services/search.service');
const llmService     = require('../services/llm.service');
const summaryService = require('../services/summary.service');
const cacheService   = require('../services/cache.service');

const NOT_FOUND_MSG      = 'No encontré esa información en los capítulos cargados del manual.';
const QUOTA_MSG          = 'Se alcanzó el límite temporal de consultas de IA. Intenta más tarde.';
// Umbral mínimo de relevancia a nivel de controlador (guard secundario).
// El search.service ya filtra score >= 3; este valor debe ser igual o mayor.
// Configurable vía ASK_MIN_RELEVANCE_SCORE en .env
const MIN_RELEVANCE_SCORE = parseInt(process.env.ASK_MIN_RELEVANCE_SCORE || '3', 10);

async function askQuestion(req, res) {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'La pregunta es obligatoria y debe ser un texto válido.' });
    }

    // 0. Verificar que los chunks estén disponibles
    if (!searchService.chunks || searchService.chunks.length === 0) {
      return res.status(500).json({
        error: 'Los fragmentos no están disponibles. Asegúrese de ejecutar npm run ingest.',
      });
    }

    // ── 1. CACHÉ ───────────────────────────────────────────────────────────────
    // Intentar responder desde caché antes de hacer cualquier llamada a Gemini
    const cached = cacheService.get(question);
    if (cached) {
      return res.json({ question, ...cached, fromCache: true });
    }

    // ── 2. DETECTAR INTENCIÓN ─────────────────────────────────────────────────
    const intent = summaryService.detectQuestionIntent(question);
    console.log(`[Ask Controller] Pregunta: "${question}" | Intención: "${intent}"`);

    // ── 3a. LISTA DE CAPÍTULOS ────────────────────────────────────────────────
    if (intent === 'chapter_list') {
      const result = summaryService.getChapterList(searchService.chunks);
      // No cachear listados de capítulos (no consumen Gemini)
      return res.json({ question, ...result });
    }

    // ── 3b. RESUMEN GLOBAL ────────────────────────────────────────────────────
    if (intent === 'global_summary') {
      try {
        const result = await summaryService.generateGlobalSummary(question, searchService.chunks);
        cacheService.set(question, { answer: result.answer, sources: result.sources, usedChunks: result.usedChunks });
        return res.json({ question, ...result });
      } catch (summaryError) {
        if (summaryError.isQuotaError) {
          return res.json({ question, answer: QUOTA_MSG, sources: [], usedChunks: [] });
        }
        console.error('[Ask Controller] Error en resumen global:', summaryError.message);
        if (summaryError.message.includes('GEMINI_API_KEY')) {
          return res.status(500).json({ error: 'Falta configurar GEMINI_API_KEY en el entorno.' });
        }
        return res.status(500).json({ error: summaryError.message });
      }
    }

    // ── 3c. BÚSQUEDA PUNTUAL ─────────────────────────────────────────────────
    const allChunks = searchService.search(question, 5);

    // Guard de calidad: filtrar a score >= MIN_RELEVANCE_SCORE (guard secundario)
    const chunks = allChunks.filter(c => c.score >= MIN_RELEVANCE_SCORE);

    console.log(`[Ask Controller] Chunks recuperados: ${allChunks.length} | Superan umbral (${MIN_RELEVANCE_SCORE}): ${chunks.length}`);

    // Sin fragmentos relevantes → respuesta directa SIN llamar a Gemini
    if (chunks.length === 0) {
      console.log('[ASK] Sin chunks relevantes. Respuesta directa sin Gemini.');
      return res.json({
        question,
        answer: NOT_FOUND_MSG,
        sources: [],
        usedChunks: [],
        fromCache: false,
      });
    }

    try {
      const answer = await llmService.generateAnswer(question, chunks);

      // Null-safe: fuentes únicas por capítulo+sección
      const sourcesMap = new Map();
      chunks.forEach(chunk => {
        const chapter = chunk.metadata?.chapter || 'Sin capítulo';
        const section = chunk.metadata?.section || 'Sin sección';
        const key     = `${chapter}||${section}`;
        if (!sourcesMap.has(key)) {
          sourcesMap.set(key, {
            chapter,
            section,
            source: chunk.metadata?.source || 'manual.structured.md',
          });
        }
      });
      const sources = Array.from(sourcesMap.values());

      // Null-safe: usedChunks para el frontend
      const usedChunks = chunks.map(chunk => ({
        id:    chunk.id,
        score: chunk.score,
        metadata: {
          chapter: chunk.metadata?.chapter || 'Sin capítulo',
          section: chunk.metadata?.section || 'Sin sección',
          source:  chunk.metadata?.source  || 'manual.structured.md',
        },
      }));

      // Si Gemini respondió "no encontrado", limpiar fuentes y no cachear
      if (answer.trim() === NOT_FOUND_MSG) {
        return res.json({ question, answer: NOT_FOUND_MSG, sources: [], usedChunks: [] });
      }

      // Guardar en caché solo respuestas válidas con contenido
      cacheService.set(question, { answer, sources, usedChunks });

      return res.json({ question, answer, sources, usedChunks });

    } catch (llmError) {
      // Error de cuota/rate-limit de Gemini → respuesta amigable (no error HTTP)
      if (llmError.isQuotaError) {
        console.warn('[Ask Controller] Cuota de Gemini excedida — respondiendo con mensaje amigable');
        return res.json({ question, answer: QUOTA_MSG, sources: [], usedChunks: [] });
      }

      console.error('[Ask Controller] Error en LLM:', llmError.message);

      if (llmError.message.includes('GEMINI_API_KEY')) {
        return res.status(500).json({ error: 'Falta configurar GEMINI_API_KEY en el entorno.' });
      }
      return res.status(500).json({ error: llmError.message });
    }

  } catch (error) {
    console.error('[Ask Controller] Error inesperado:', error);
    return res.status(500).json({ error: 'Ocurrió un error interno al procesar la pregunta.' });
  }
}

module.exports = { askQuestion };
