const express = require('express');
const router  = express.Router();
const { getTOC } = require('../controllers/toc.controller');

// GET /api/toc — tabla de contenido jerárquica, sin Gemini
router.get('/', getTOC);

module.exports = router;
