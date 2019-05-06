const express = require('express');
const router = express.Router();

const pool = require('../config/postgresql').pool;

// Require controller modules.
const book_controller = require('../controllers/books');

/// BOOKS ROUTES ///

// POST request for creating book.
router.post('/', book_controller.book_create);

// GET request for list of all book items.
router.get('/', book_controller.book_list);

// GET request for one book.
router.get('/:id', book_controller.book_detail);

// PUT request to update book.
router.put('/:id', book_controller.book_update);

// DELETE request to delete book.
router.delete('/:id', book_controller.book_delete);

router.get('/authors/:id', book_controller.book_authors);

router.get('/genres/:id', book_controller.book_genres);

router.get('/serie/:id', book_controller.book_serie);

module.exports = router;
