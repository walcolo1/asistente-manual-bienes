/**
 * source.controller.js
 * Maneja GET /api/source/:id
 */

const sourceService = require('../services/source.service');

function getSource(req, res) {
  const { id } = req.params;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'El ID de la fuente es requerido.' });
  }

  const chunk = sourceService.findById(id);

  if (!chunk) {
    return res.status(404).json({ error: 'Fuente no encontrada.' });
  }

  return res.json({
    id: chunk.id,
    metadata: {
      chapter: chunk.metadata?.chapter || 'Sin capítulo',
      section: chunk.metadata?.section || 'Sin sección',
      source: chunk.metadata?.source || 'manual.structured.md',
    },
    content: chunk.content,
    score: 0,
  });
}

module.exports = { getSource };
