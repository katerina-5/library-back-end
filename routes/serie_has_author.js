const express = require('express');
const router = express.Router();

// require controller modules
const serie_has_author_controller = require('./../controllers/serie_has_author');

/// SerieHasAuthor ROUTES ///

// POST request for create Serie-Author
router.post('/serie_has_author', serie_has_author_controller.serie_has_author_create);

// DELETE request for delete Serie-Author
router.delete('/serie_has_author', serie_has_author_controller.serie_has_author_delete);

// GET request for all series of author (by id)
router.get('/author_series/:id', serie_has_author_controller.get_series_of_author);

// GET request for all authors of serie (by id)
router.get('/serie_authors/:id', serie_has_author_controller.get_authors_of_serie);

module.exports = router;