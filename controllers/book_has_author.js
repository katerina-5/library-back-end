const pool = require('./../config/postgresql').pool;

module.exports = {
    book_has_author_create,
    book_has_author_delete,
    get_books_of_author,
    get_authors_of_book
}

// create relationship between Book and Author
async function book_has_author_create(request, response, next) {
    console.log('BookHasAuthor create');

    try {
        const { id_book, id_author } = request.body;

        const results = await pool.query('INSERT INTO bookhasauthor(id_book, id_author) VALUES($1, $2)', [id_book, id_author]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// delete relationship between Book and Author
async function book_has_author_delete(request, response, next) {
    console.log('BookHasAuthor delete');

    try {
        const { id_book, id_author } = request.body;

        const results = await pool.query('DELETE FROM bookhasauthor WHERE id_book = $1 AND id_author = $2', [id_book, id_author]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all books of this author
async function get_books_of_author(request, response, next) {
    console.log('get all books of this author (BookHasAuthor)');

    try {
        const id_author = request.params.id;

        const results = await pool.query('SELECT * FROM books WHERE id_book IN (SELECT id_book FROM bookhasauthor WHERE id_author = $1)',
            [id_author]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all authors of this book
async function get_authors_of_book(request, response, next) {
    console.log('get all authors of this book (BookHasAuthor)');

    try {
        const id_book = request.params.id;

        const results = await pool.query('SELECT * FROM authors WHERE id_author IN (SELECT id_author FROM bookhasauthor WHERE id_book = $1)',
            [id_book]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}
