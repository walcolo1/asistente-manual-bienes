const express = require('express');
const router  = express.Router();
const { getSection } = require('../controllers/section.controller');

// GET /api/section/:id — detalle de sección por ID estable, sin Gemini
router.get('/:id', getSection);

module.exports = router;
