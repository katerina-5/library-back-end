const express = require('express');
const router = express.Router();

// require controller modules
const book_has_genre_controller = require('./../controllers/book_has_genre');

/// BookHasGenre ROUTES ///

// POST request for create Book-Genre
router.post('/book_has_genre', book_has_genre_controller.book_has_genre_create);

// DELETE request for delete Book-Genre
router.delete('/book_has_genre', book_has_genre_controller.book_has_genre_delete);

// GET request for all books of genre (by id)
router.get('/genre_books/:id', book_has_genre_controller.get_books_of_genre);

// GET request for all genres of book (by id)
router.get('/book_genres/:id', book_has_genre_controller.get_genres_of_book);

module.exports = router;