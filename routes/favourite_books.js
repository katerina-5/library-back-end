const express = require('express');
const router = express.Router();

// require controller modules
const favourite_books_controller = require('./../controllers/favourite_books');

/// FAVOURITE BOOKS ROUTES ///

// POST request for create favourite book
router.post('/', favourite_books_controller.favourite_book_create);

// DELETE request for delete favourite book
router.post('/delete', favourite_books_controller.favourite_book_delete);

// GET request for all books (by user id)
router.get('/:id', favourite_books_controller.get_favourite_books);

module.exports = router;
