const express = require('express');
const router = express.Router();
const sourceController = require('../controllers/source.controller');

// GET /api/source/:id
router.get('/:id', sourceController.getSource);

module.exports = router;
