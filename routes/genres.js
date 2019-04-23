const express = require('express');
const router = express.Router();

// Require controller modules.
const genre_controller = require('../controllers/genres');

/// GENRES ROUTES ///

// POST request for creating genre.
router.post('/', genre_controller.genre_create);

// GET request for list of all genre items.
router.get('/', genre_controller.genre_list);

// GET request for one genre.
router.get('/:id', genre_controller.genre_detail);

// PUT request to update genre.
router.put('/:id', genre_controller.genre_update);

// DELETE request to delete genre.
router.delete('/:id', genre_controller.genre_delete);

module.exports = router;