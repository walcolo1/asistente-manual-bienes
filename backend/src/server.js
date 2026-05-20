const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors    = require('cors');

const searchRoutes        = require('./routes/search.routes');
const askRoutes           = require('./routes/ask.routes');
const sourceRoutes        = require('./routes/source.routes');
const tocRoutes           = require('./routes/toc.routes');
const sectionRoutes       = require('./routes/section.routes');
const askSectionRoutes    = require('./routes/ask-section.routes');
const rateLimitMiddleware = require('./middleware/rate-limit.middleware');

const app  = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
];
let frontendUrl = process.env.FRONTEND_URL;
if (frontendUrl) {
  // Remover barra final si existe
  frontendUrl = frontendUrl.replace(/\/$/, '');
  allowedOrigins.push(frontendUrl);
}

app.use(cors({
  origin: function(origin, callback) {
    // Permitir si no hay origen, está en la lista exacta, es un subdominio de vercel o frontendUrl es '*'
    if (
      !origin || 
      frontendUrl === '*' ||
      allowedOrigins.includes(origin) || 
      (origin && origin.endsWith('.vercel.app'))
    ) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Origen bloqueado: ${origin}`);
      callback(new Error('No permitido por CORS'));
    }
  }
}));
app.use(express.json());

// ✅ Health check — registrado primero para garantizar disponibilidad
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

app.use('/api/search',      searchRoutes);
app.use('/api/ask',         rateLimitMiddleware, askRoutes);   // ← rate limit + Gemini
app.use('/api/ask-section', askSectionRoutes);                 // ← rate limit incluido en la ruta
app.use('/api/source',      sourceRoutes);
app.use('/api/toc',         tocRoutes);                        // ← sin Gemini
app.use('/api/section',     sectionRoutes);                    // ← sin Gemini

app.listen(PORT, () => {
  console.log(`Servidor backend activo en puerto ${PORT}`);
  console.log(`GEMINI_API_KEY detectada: ${process.env.GEMINI_API_KEY ? 'sí' : 'no'}`);
  console.log(`Rate limit configurado: ${process.env.ASK_RATE_LIMIT_PER_MINUTE || 10}/min | ${process.env.ASK_RATE_LIMIT_PER_DAY || 50}/día`);
});
