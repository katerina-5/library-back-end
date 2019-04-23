const express = require('express');
const router = express.Router();

// require controller modules
const author_has_genre_controller = require('./../controllers/author_has_genre');

/// AuthorHasGenre ROUTES ///

// POST request for create Author-Genre
router.post('/author_has_genre', author_has_genre_controller.author_has_genre_create);

// DELETE request for delete Author-Genre
router.delete('/author_has_genre', author_has_genre_controller.author_has_genre_delete);

// GET request for all authors of genre (by id)
router.get('/genre_authors/:id', author_has_genre_controller.get_authors_of_genre);

// GET request for all genres of author (by id)
router.get('/author_genres/:id', author_has_genre_controller.get_genres_of_author);

module.exports = router;