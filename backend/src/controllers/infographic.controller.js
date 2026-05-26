const infographicService = require('../services/infographic.service');

async function generateInfographic(req, res) {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: 'Se requieren los campos "question" y "answer".' });
    }

    console.log(`[Infographic Controller] Generando infografía para: "${question.substring(0, 80)}..."`);

    const data = await infographicService.generate(question, answer);

    return res.json(data);
  } catch (error) {
    if (error.isQuotaError) {
      console.warn('[Infographic Controller] Cuota de Gemini excedida');
      return res.status(429).json({ error: 'Se alcanzó el límite temporal de consultas de IA. Intenta más tarde.' });
    }

    console.error('[Infographic Controller] Error:', error.message);
    return res.status(500).json({ error: 'Error al generar la infografía.' });
  }
}

module.exports = { generateInfographic };
