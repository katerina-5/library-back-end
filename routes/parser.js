const express = require('express');
const router = express.Router();

// Require controller modules.
const parser_controller = require('../controllers/parser');

/// PARSER ROUTES ///

router.post('/book', parser_controller.parse_book);

router.post('/author', parser_controller.parse_author);

router.post('/genre', parser_controller.parse_genre);

router.post('/serie', parser_controller.parse_serie);

module.exports = router;