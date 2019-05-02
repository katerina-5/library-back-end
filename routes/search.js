const express = require('express');
const router = express.Router();

// Require controller modules.
const search_controller = require('../controllers/search');

/// SEARCH ROUTES ///

router.post('/books', search_controller.search_books);

router.post('/authors', search_controller.search_authors);

router.post('/genres', search_controller.search_genres);

router.post('/series', search_controller.search_series);

module.exports = router;