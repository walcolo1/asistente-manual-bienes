/**
 * toc.controller.js
 * Devuelve la tabla de contenido jerárquica del manual.
 * NO llama a Gemini.
 */

const tocService = require('../services/toc.service');

function getTOC(req, res) {
  try {
    const toc = tocService.buildTOC();
    return res.json(toc);
  } catch (err) {
    console.error('[TOC Controller] Error al construir TOC:', err.message);
    return res.status(500).json({ error: 'No se pudo construir la tabla de contenido.' });
  }
}

module.exports = { getTOC };
