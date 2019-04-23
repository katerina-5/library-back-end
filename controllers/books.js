const pool = require('./../config/postgresql').pool;

module.exports = {
    book_list,
    book_detail,
    book_create,
    book_delete,
    book_update
};

// Display list of all books.
async function book_list(request, response, next) {
    console.log('List of books');

    try {
        const results = await pool.query('SELECT * FROM books ORDER BY id_book');
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// Display detail page for a specific book.
async function book_detail(request, response, next) {
    console.log('Book detail');

    try {
        const id_book = request.params.id;

        const results = await pool.query('SELECT * FROM books WHERE id_book = $1', [id_book]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// book create on POST.
async function book_create(request, response, next) {
    console.log('Book create');

    try {
        const { id_serie, title_book, url_book, image_url, year, description, rating } = request.body;

        const results = await pool.query('INSERT INTO books(id_serie, title_book, url_book, image_url, year, description, rating) VALUES($1, $2, $3, $4, $5, $6, $7)',
            [id_serie, title_book, url_book, image_url, year, description, rating]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// book update on PUT.
async function book_update(request, response, next) {
    console.log('Book update');

    try {
        const id_book = request.params.id;
        const { id_serie, title_book, url_book, image_url, year, description, rating } = request.body;

        const results = await pool.query('UPDATE books SET id_serie = $2, title_book = $3, url_book = $4, image_url = $5, year = $6, description = $7, rating = $8 WHERE id_book = $1',
            [id_book, id_serie, title_book, url_book, image_url, year, description, rating]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// book delete on DELETE.
async function book_delete(request, response, next) {
    console.log('Book delete');

    try {
        const id_book = request.params.id;

        const results = await pool.query('DELETE FROM books WHERE id_book = $1', [id_book]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}
