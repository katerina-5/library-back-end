const express = require('express');
const router = express.Router();

// require controller modules
const favourite_authors_controller = require('./../controllers/favourite_authors');

/// FAVOURITE AUTHORS ROUTES ///

// POST request for create favourite author
router.post('/', favourite_authors_controller.favourite_author_create);

// DELETE request for delete favourite author
router.post('/delete', favourite_authors_controller.favourite_author_delete);

// POST request for check author in favourite
router.post('/check', favourite_authors_controller.check_author);

// GET request for all authors (by user id)
router.get('/:id', favourite_authors_controller.get_favourite_authors);

module.exports = router;