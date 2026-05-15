/**
 * cache.service.js
 *
 * Caché en memoria para respuestas de /api/ask.
 * TTL: 10 minutos (configurable en la constante TTL_MS).
 * Clave: pregunta normalizada (lowercase + trim + sin puntuación extra).
 *
 * Ventajas:
 * - Evita llamadas duplicadas a Gemini API.
 * - Reduce latencia para preguntas repetidas.
 * - No persiste entre reinicios del servidor (intencionalmente).
 */

class CacheService {
  constructor() {
    /** @type {Map<string, { data: object, expiresAt: number }>} */
    this.store  = new Map();
    this.TTL_MS = 10 * 60 * 1000; // 10 minutos

    // Limpieza periódica para evitar memory leaks
    setInterval(() => this.purgeExpired(), 5 * 60 * 1000);
  }

  /**
   * Normaliza la pregunta para usar como clave de caché.
   * Elimina diferencias de mayúsculas, tildes de puntuación y espacios.
   * @param {string} question
   * @returns {string}
   */
  _normalizeKey(question) {
    return question
      .toLowerCase()
      .trim()
      .replace(/[¿?¡!.,;:\-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Recupera una respuesta cacheada. Retorna null si no existe o expiró.
   * @param {string} question
   * @returns {{ answer: string, sources: any[], usedChunks: any[] } | null}
   */
  get(question) {
    const key   = this._normalizeKey(question);
    const entry = this.store.get(key);

    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      console.log(`[Cache] Entrada expirada eliminada: "${key.slice(0, 60)}"`);
      return null;
    }

    console.log(`[Cache] HIT para: "${key.slice(0, 60)}"`);
    return entry.data;
  }

  /**
   * Almacena una respuesta en caché.
   * @param {string} question
   * @param {{ answer: string, sources: any[], usedChunks: any[] }} data
   */
  set(question, data) {
    const key = this._normalizeKey(question);
    this.store.set(key, {
      data,
      expiresAt: Date.now() + this.TTL_MS,
    });
    console.log(`[Cache] SET para: "${key.slice(0, 60)}" (TTL: 10 min)`);
  }

  /** Elimina entradas expiradas del store */
  purgeExpired() {
    const now    = Date.now();
    let removed  = 0;
    for (const [key, entry] of this.store) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
        removed++;
      }
    }
    if (removed > 0) console.log(`[Cache] Purge: ${removed} entradas eliminadas. Quedan: ${this.store.size}`);
  }

  /** Tamaño actual del store (para diagnóstico) */
  size() { return this.store.size; }
}

module.exports = new CacheService();
