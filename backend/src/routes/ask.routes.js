const express = require('express');
const router = express.Router();
const askController = require('../controllers/ask.controller');

router.post('/', askController.askQuestion);

module.exports = router;
