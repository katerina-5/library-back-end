const express = require('express');
const router = express.Router();

// require controller modules
const favourite_genres_controller = require('./../controllers/favourite_genres');

/// FAVOURITE GENRES ROUTES ///

// POST request for create favourite genre
router.post('/', favourite_genres_controller.favourite_genre_create);

// DELETE request for delete favourite genre
router.post('/delete', favourite_genres_controller.favourite_genre_delete);

// POST request for check genre in favourite
router.post('/check', favourite_genres_controller.check_genre);

// GET request for all genres (by user id)
router.get('/:id', favourite_genres_controller.get_favourite_genres);

module.exports = router;