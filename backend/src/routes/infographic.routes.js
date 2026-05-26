const express = require('express');
const router = express.Router();
const { generateInfographic } = require('../controllers/infographic.controller');
const rateLimitMiddleware = require('../middleware/rate-limit.middleware');

router.post('/', rateLimitMiddleware, generateInfographic);

module.exports = router;
