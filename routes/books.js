const express = require('express');
const router = express.Router();

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

module.exports = router;