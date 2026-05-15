/**
 * ask-section.routes.js
 * POST /api/ask-section — explica una sección usando sus chunks como contexto directo.
 */

const express    = require('express');
const router     = express.Router();
const { askSection } = require('../controllers/ask-section.controller');
const rateLimitMiddleware = require('../middleware/rate-limit.middleware');

// Rate limit: misma política que /api/ask (consume Gemini)
router.post('/', rateLimitMiddleware, askSection);

module.exports = router;
