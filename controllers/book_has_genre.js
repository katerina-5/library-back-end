const pool = require('./../config/postgresql').pool;

module.exports = {
    book_has_genre_create,
    book_has_genre_delete,
    get_books_of_genre,
    get_genres_of_book
}

// create relationship between Book and Genre
async function book_has_genre_create(request, response, next) {
    console.log('BookHasGenre create');

    try {
        const { id_book, id_genre } = request.body;

        const results = await pool.query('INSERT INTO bookhasgenre(id_book, id_genre) VALUES($1, $2)', [id_book, id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// delete relationship between Book and Genre
async function book_has_genre_delete(request, response, next) {
    console.log('BookHasGenre delete');

    try {
        const { id_book, id_genre } = request.body;

        const results = await pool.query('DELETE FROM bookhasgenre WHERE id_book = $1 AND id_genre = $2', [id_book, id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all books of this genre
async function get_books_of_genre(request, response, next) {
    console.log('get all books of this genre (BookHasGenre)');

    try {
        const id_genre = request.params.id;

        const results = await pool.query('SELECT * FROM books WHERE id_book IN (SELECT id_book FROM bookhasgenre WHERE id_genre = $1)',
            [id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all genres of this book
async function get_genres_of_book(request, response, next) {
    console.log('get all genres of this book (BookHasGenre)');

    try {
        const id_book = request.params.id;

        const results = await pool.query('SELECT * FROM genres WHERE id_genre IN (SELECT id_genre FROM bookhasgenre WHERE id_book = $1)',
            [id_book]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}
