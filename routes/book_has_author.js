const express = require('express');
const router = express.Router();

// require controller modules
const book_has_author_controller = require('./../controllers/book_has_author');

/// BookHasAuthor ROUTES ///

// POST request for create Book-Author
router.post('/book_has_author', book_has_author_controller.book_has_author_create);

// DELETE request for delete Book-Author
router.delete('/book_has_author', book_has_author_controller.book_has_author_delete);

// GET request for all books of author (by id)
router.get('/author_books/:id', book_has_author_controller.get_books_of_author);

// GET request for all authors of book (by id)
router.get('/book_authors/:id', book_has_author_controller.get_authors_of_book);

module.exports = router;