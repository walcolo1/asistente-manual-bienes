/**
 * section.controller.js
 * Devuelve el detalle de una sección del manual por su ID estable.
 * NO llama a Gemini.
 */

const sectionService = require('../services/section.service');

function getSection(req, res) {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ID de sección inválido.' });
    }

    const section = sectionService.getSectionById(id);

    if (!section) {
      return res.status(404).json({ error: 'Sección no encontrada.' });
    }

    return res.json(section);
  } catch (err) {
    console.error('[Section Controller] Error al obtener sección:', err.message);
    return res.status(500).json({ error: 'No se pudo recuperar la sección.' });
  }
}

module.exports = { getSection };
