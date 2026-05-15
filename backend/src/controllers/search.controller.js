const searchService = require('../services/search.service');

const search = (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ 
        error: 'Petición inválida',
        message: 'Debes proporcionar una pregunta válida en el body: {"question": "..."}' 
      });
    }

    console.log(`[Búsqueda] Pregunta recibida: "${question}"`);

    const results = searchService.search(question);

    if (results.length === 0) {
      return res.status(200).json({
        question,
        results: [],
        message: "No encontré esa información en los capítulos cargados del manual."
      });
    }

    return res.status(200).json({
      question,
      results
    });
  } catch (error) {
    console.error(`[Error de Búsqueda]:`, error);
    return res.status(500).json({
      error: 'Error interno del servidor al procesar la búsqueda.',
      message: error.message
    });
  }
};

module.exports = {
  search
};
