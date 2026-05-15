/**
 * rate-limit.middleware.js
 *
 * Rate limiter en memoria por IP para /api/ask.
 * Configurable por variables de entorno:
 *   ASK_RATE_LIMIT_PER_MINUTE (default: 10)
 *   ASK_RATE_LIMIT_PER_DAY    (default: 50)
 *
 * Estructura del store (Map):
 *   ip → { minute: { count, resetAt }, day: { count, resetAt } }
 */

const store = new Map();

// Limpieza periódica cada 5 min para evitar memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of store) {
    // Si ambas ventanas expiraron, eliminar la entrada
    if (now > record.minute.resetAt && now > record.day.resetAt) {
      store.delete(ip);
    }
  }
}, 5 * 60 * 1000);

function rateLimitMiddleware(req, res, next) {
  const perMinute = parseInt(process.env.ASK_RATE_LIMIT_PER_MINUTE || '10', 10);
  const perDay    = parseInt(process.env.ASK_RATE_LIMIT_PER_DAY    || '50', 10);

  // Extraer IP de forma compatible con proxies (en prod usar trust proxy)
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim()
    || req.socket?.remoteAddress
    || req.ip
    || 'unknown';

  const now = Date.now();

  if (!store.has(ip)) {
    store.set(ip, {
      minute: { count: 0, resetAt: now + 60_000 },
      day:    { count: 0, resetAt: now + 86_400_000 },
    });
  }

  const record = store.get(ip);

  // Resetear ventanas expiradas
  if (now > record.minute.resetAt) {
    record.minute = { count: 0, resetAt: now + 60_000 };
  }
  if (now > record.day.resetAt) {
    record.day = { count: 0, resetAt: now + 86_400_000 };
  }

  // Verificar límite por minuto
  if (record.minute.count >= perMinute) {
    const retryAfterSec = Math.ceil((record.minute.resetAt - now) / 1000);
    console.warn(`[Rate Limit] IP ${ip} bloqueada — límite/min (${perMinute}) alcanzado. Retry en ${retryAfterSec}s`);
    return res.status(429).json({
      answer: `Alcanzaste el límite de ${perMinute} consultas por minuto. Espera ${retryAfterSec} segundos e intenta de nuevo.`,
      sources: [],
      usedChunks: [],
      rateLimited: true,
      retryAfterSeconds: retryAfterSec,
    });
  }

  // Verificar límite diario
  if (record.day.count >= perDay) {
    console.warn(`[Rate Limit] IP ${ip} bloqueada — límite/día (${perDay}) alcanzado.`);
    return res.status(429).json({
      answer: `Alcanzaste el límite de ${perDay} consultas diarias. Vuelve mañana.`,
      sources: [],
      usedChunks: [],
      rateLimited: true,
    });
  }

  // Incrementar contadores y continuar
  record.minute.count++;
  record.day.count++;

  console.log(`[Rate Limit] IP ${ip} — min: ${record.minute.count}/${perMinute} | día: ${record.day.count}/${perDay}`);
  next();
}

module.exports = rateLimitMiddleware;
