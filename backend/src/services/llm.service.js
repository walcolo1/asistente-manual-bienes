const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Error especial para cuando Gemini devuelve cuota/rate-limit.
 * El controlador lo captura y responde con un mensaje amigable
 * en lugar de un error HTTP 500 genérico.
 */
class GeminiQuotaError extends Error {
  constructor(originalMessage) {
    super('GEMINI_QUOTA_EXCEEDED');
    this.name = 'GeminiQuotaError';
    this.isQuotaError = true;
    this.originalMessage = originalMessage;
  }
}

/**
 * Detecta si un error de la Gemini API corresponde a cuota/rate-limit/billing.
 * @param {Error} error
 * @returns {boolean}
 */
function isQuotaError(error) {
  if (error.status === 429 || error.code === 429) return true;
  const msg = (error.message || '').toLowerCase();
  if (/quota|rate.?limit|resource.?exhausted|billing/i.test(msg)) return true;
  // errorDetails es un array en algunos SDK versions
  if (Array.isArray(error.errorDetails)) {
    return error.errorDetails.some(d =>
      /RESOURCE_EXHAUSTED|QUOTA_EXCEEDED/i.test(d?.reason || d?.domain || d?.message || '')
    );
  }
  return false;
}

class LLMService {
  async generateAnswer(question, contextChunks) {
    const apiKey    = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

    console.log(`[LLM Service] GEMINI_MODEL usado: ${modelName}`);
    console.log(`[LLM Service] GEMINI_API_KEY detectada: ${apiKey ? 'sí' : 'no'}`);
    console.log(`[LLM Service] Chunks a procesar: ${contextChunks?.length ?? 0}`);

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY no está configurada.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction:
        'Eres un asistente experto en el Manual de Bienes. Responde únicamente con base en el CONTEXTO proporcionado. ' +
        'No uses conocimiento general. No inventes información. No agregues procedimientos que no estén en el contexto. ' +
        "Si la respuesta no está claramente sustentada en el contexto, responde exactamente: " +
        "'No encontré esa información en los capítulos cargados del manual.' " +
        'Toda respuesta debe citar las fuentes usando capítulo y sección.',
    });

    try {
      // Null-safe: contexto dentro del try para capturar errores de construcción
      const contextText = contextChunks.map((chunk, index) => {
        const chapter = chunk.metadata?.chapter || 'Sin capítulo';
        const section = chunk.metadata?.section || 'Sin sección';
        const content = chunk.content           || '[contenido no disponible]';
        return [
          `--- FRAGMENTO ${index + 1} ---`,
          `Capítulo: ${chapter}`,
          `Sección: ${section}`,
          'Contenido:',
          content,
        ].join('\n');
      }).join('\n\n');

      const prompt = [
        'CONTEXTO:',
        contextText,
        '',
        'PREGUNTA DEL USUARIO:',
        question,
        '',
        'Responde a la pregunta basándote estrictamente en el contexto anterior.',
      ].join('\n');

      console.log(`[LLM Service] Prompt enviado a Gemini (caracteres: ${prompt.length})`);

      const result   = await model.generateContent(prompt);
      const response = await result.response;

      // Manejar respuestas bloqueadas o sin candidatos
      const candidates = response.candidates;
      if (!candidates || candidates.length === 0) {
        console.warn('[LLM Service] Gemini devolvió respuesta sin candidatos');
        return 'No encontré esa información en los capítulos cargados del manual.';
      }

      const finishReason = candidates[0]?.finishReason;
      if (finishReason === 'SAFETY' || finishReason === 'RECITATION') {
        console.warn(`[LLM Service] Respuesta bloqueada por Gemini (finishReason: ${finishReason})`);
        return 'No encontré esa información en los capítulos cargados del manual.';
      }

      const text = response.text();
      if (!text || !text.trim()) {
        console.warn('[LLM Service] Gemini devolvió texto vacío');
        return 'No encontré esa información en los capítulos cargados del manual.';
      }

      console.log(`[LLM Service] Respuesta recibida (chars: ${text.length})`);
      return text;

    } catch (error) {
      // ── Detectar errores de cuota/rate-limit/billing ─────────────────────────
      if (isQuotaError(error)) {
        console.error('[LLM Service] Error de cuota/rate-limit detectado:', error.message);
        throw new GeminiQuotaError(error.message);
      }

      // ── Cualquier otro error — log completo en backend, mensaje seguro al front ─
      console.error('[LLM Service] Error al generar respuesta con Gemini:');
      console.error(`  message: ${error.message}`);
      if (error.status)       console.error(`  status: ${error.status}`);
      if (error.code)         console.error(`  code: ${error.code}`);
      if (error.details)      console.error(`  details:`, error.details);
      if (error.errorDetails) console.error(`  errorDetails:`, JSON.stringify(error.errorDetails));
      if (error.stack)        console.error(`  stack: ${error.stack.split('\n').slice(0, 3).join(' | ')}`);

      throw new Error('Error al conectar con el servicio de IA.');
    }
  }
}

module.exports = new LLMService();
