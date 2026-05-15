/**
 * summary.service.js
 *
 * Maneja consultas globales del manual:
 *   - Resumen general organizado por capítulos
 *   - Lista de capítulos
 *
 * NO usa embeddings, NO usa LangChain, NO usa bases vectoriales.
 * Construye un contexto reducido y controlado desde chunks.json (ya en memoria).
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

// ─── DETECCIÓN DE INTENCIÓN ──────────────────────────────────────────────────

/**
 * Clasifica la intención de la pregunta del usuario.
 * @param {string} question
 * @returns {'global_summary' | 'chapter_list' | 'specific_search'}
 */
function detectQuestionIntent(question) {
  const n = question
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar tildes
    .replace(/[¿?¡!]/g, '')
    .trim();

  // ── Capítulos ───────────────────────────────────────────────────────────────
  const chapterListPatterns = [
    /cuales?\s+son\s+(los\s+)?capitulos?/,
    /que\s+capitulos?\s+(tiene|hay|contiene|incluye)/,
    /lista\s+(de\s+)?(los\s+)?capitulos?/,
    /cuantos\s+capitulos?/,
    /muestra(me)?\s+(los\s+)?capitulos?/,
    /dame\s+(los\s+)?capitulos?/,
    /nombres?\s+(de\s+)?(los\s+)?capitulos?/,
  ];

  // ── Resumen global ──────────────────────────────────────────────────────────
  const globalSummaryPatterns = [
    /resumen\s+(de\s+)?(todo\s+)?(el\s+)?manual/,
    /resumeme\s+(el\s+)?(todo\s+)?(el\s+)?manual/,
    /resume\s+(el\s+)?(todo\s+)?(el\s+)?manual/,
    /hazme?\s+(un\s+)?(resumen|sintesis)/,
    /dame\s+(un\s+)?(resumen|sintesis|vision\s+general|idea\s+general|panorama)/,
    /sintesis\s+(general|del?\s+manual)/,
    /de\s+que\s+trata\s+(el\s+)?manual/,
    /que\s+(contiene|trata|cubre|incluye|abarca|habla)\s+(el\s+)?manual/,
    /explicame?\s+(el\s+)?(manual|todo\s+el\s+manual)/,
    /sobre\s+que\s+(es|trata|habla)\s+(el\s+)?manual/,
    /vision\s+general\s+(del?\s+)?manual/,
    /panorama\s+(general\s+)?(del?\s+)?manual/,
    /que\s+es\s+el\s+manual/,
    /overview\s+(del?\s+)?manual/,
    /resumen\s+general/,
    /manual\s+completo/,
  ];

  for (const pattern of chapterListPatterns) {
    if (pattern.test(n)) return 'chapter_list';
  }

  for (const pattern of globalSummaryPatterns) {
    if (pattern.test(n)) return 'global_summary';
  }

  return 'specific_search';
}

// ─── UTILIDADES INTERNAS ─────────────────────────────────────────────────────

/**
 * Agrupa chunks por capítulo, manteniendo el orden de aparición.
 * @param {Array} chunks - todos los chunks cargados en memoria
 * @returns {Map<string, Array>} chapterName → [chunk, ...]
 */
function groupByChapter(chunks) {
  const map = new Map();
  for (const chunk of chunks) {
    const ch = chunk.metadata?.chapter || 'SIN CAPÍTULO';
    if (!map.has(ch)) map.set(ch, []);
    map.get(ch).push(chunk);
  }
  return map;
}

/**
 * Construye un contexto compacto: máximo MAX_PER_CHAPTER fragmentos por capítulo.
 * Se toman los primeros (normalmente son las definiciones/introducciones del capítulo).
 */
function buildCompactContext(chunks, maxPerChapter = 2) {
  const grouped = groupByChapter(chunks);
  const selected = [];

  for (const [chapter, chapterChunks] of grouped) {
    // Priorizar los primeros fragmentos del capítulo (introductorios)
    const representatives = chapterChunks.slice(0, maxPerChapter);
    selected.push(...representatives.map(c => ({ ...c, _chapter: chapter })));
  }

  return { selected, grouped };
}

// ─── LLAMADA A GEMINI ────────────────────────────────────────────────────────

async function callGemini(systemInstruction, prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

  if (!apiKey) throw new Error('GEMINI_API_KEY no está configurada.');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName, systemInstruction });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ─── RESUMEN GLOBAL ──────────────────────────────────────────────────────────

/**
 * Genera un resumen general del manual organizado por capítulos.
 * @param {string} question - la pregunta original del usuario
 * @param {Array} allChunks - todos los chunks en memoria (de search.service)
 * @returns {{ answer: string, sources: Array, usedChunks: Array }}
 */
async function generateGlobalSummary(question, allChunks) {
  const { selected, grouped } = buildCompactContext(allChunks, 2);

  // Construir contexto para Gemini
  const contextText = selected.map((chunk, i) => {
    return [
      `--- FRAGMENTO ${i + 1} ---`,
      `Capítulo: ${chunk.metadata.chapter}`,
      `Sección: ${chunk.metadata.section}`,
      `Contenido:`,
      chunk.content,
    ].join('\n');
  }).join('\n\n');

  const systemInstruction = [
    'Eres un asistente experto en el Manual de Bienes Municipales.',
    'Tu tarea es generar un resumen general del manual basándote ÚNICAMENTE en los fragmentos de contexto proporcionados.',
    'No uses conocimiento externo. No inventes información.',
    'Organiza la respuesta por capítulos, mencionando los temas principales de cada uno.',
    'Usa un tono profesional e institucional.',
    'Al final de cada punto de capítulo, indica la fuente entre paréntesis.',
    'Si hay capítulos sin suficiente información en el contexto, indícalo brevemente.',
  ].join(' ');

  const prompt = [
    'CONTEXTO DEL MANUAL (fragmentos representativos por capítulo):',
    contextText,
    '',
    `INSTRUCCIÓN: ${question}`,
    '',
    'Genera un resumen general del manual organizado por capítulos, basándote estrictamente en el contexto anterior.',
  ].join('\n');

  const answer = await callGemini(systemInstruction, prompt);

  // Sources: un entry por capítulo
  const sources = Array.from(grouped.keys()).map(chapter => ({
    chapter,
    section: 'Resumen general del capítulo',
    source: 'manual.structured.md',
  }));

  // usedChunks: los chunks seleccionados (minimizados)
  const usedChunks = selected.map(chunk => ({
    id: chunk.id,
    score: null,
    metadata: {
      chapter: chunk.metadata.chapter,
      section: chunk.metadata.section,
      source: chunk.metadata.source || 'manual.structured.md',
    },
  }));

  return { answer, sources, usedChunks };
}

// ─── LISTA DE CAPÍTULOS ──────────────────────────────────────────────────────

/**
 * Responde con la lista de capítulos del manual sin llamar a Gemini.
 * @param {Array} allChunks
 * @returns {{ answer: string, sources: Array, usedChunks: Array }}
 */
function getChapterList(allChunks) {
  const grouped = groupByChapter(allChunks);
  const chapters = Array.from(grouped.keys());

  const lines = [
    'El Manual de Bienes contiene los siguientes capítulos:\n',
    ...chapters.map((ch, i) => `${i + 1}. ${ch}`),
    '',
    `Total: ${chapters.length} capítulo${chapters.length !== 1 ? 's' : ''}.`,
  ];

  const answer = lines.join('\n');

  const sources = chapters.map(chapter => ({
    chapter,
    section: 'Índice del manual',
    source: 'manual.structured.md',
  }));

  return { answer, sources, usedChunks: [] };
}

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

module.exports = {
  detectQuestionIntent,
  generateGlobalSummary,
  getChapterList,
};
