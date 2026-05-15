/**
 * source.service.js
 * Servicio de solo lectura para recuperar un chunk por ID.
 * Reutiliza los chunks ya cargados en memoria por search.service (sin re-leer el archivo).
 */

const searchService = require('./search.service');

/**
 * Busca un chunk por su ID en los datos en memoria.
 * @param {string} id
 * @returns {object|null} chunk completo o null si no existe
 */
function findById(id) {
  if (!searchService.chunks || searchService.chunks.length === 0) return null;
  return searchService.chunks.find(c => c.id === id) || null;
}

module.exports = { findById };
