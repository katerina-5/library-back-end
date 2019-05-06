const express = require('express');
const router = express.Router();

const pool = require('../config/postgresql').pool;

// Require controller modules.
const author_controller = require('../controllers/authors');

/// AUTHORS ROUTES ///

// POST request for creating author.
router.post('/', author_controller.author_create);

// GET request for list of all author items.
router.get('/', author_controller.author_list);

// GET request for one author.
router.get('/:id', author_controller.author_detail);

// PUT request to update author.
router.put('/:id', author_controller.author_update);

// DELETE request to delete author.
router.delete('/:id', author_controller.author_delete);

router.get('/books/:id', author_controller.author_books);

router.get('/genres/:id', author_controller.author_genres);

router.get('/series/:id', author_controller.author_series);

module.exports = router;