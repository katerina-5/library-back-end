const pool = require('../config/postgresql').pool;

module.exports = {
    search_books,
    search_authors,
    search_genres,
    search_series
};

async function search_books(request, response, next) {
    console.log('Searching of books');

    console.log(request.body.search_request);
    const search_request = request.body.search_request;

    try {
        const results = await pool.query('Select * from books where title_book = $1',
            [search_request]);
        console.log(results.rows);
        response.status(200).json(results.rows);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

async function search_authors(request, response, next) {
    console.log('Searching of authors');

    console.log(request.body.search_request);
    const search_request = request.body.search_request;

    try {
        const results = await pool.query('Select * from authors where full_name = $1',
            [search_request]);
        console.log(results.rows);
        response.status(200).json(results.rows);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

async function search_genres(request, response, next) {
    console.log('Searching of genres');

    console.log(request.body.search_request);
    const search_request = request.body.search_request;

    try {
        const results = await pool.query('Select * from genres where title_genre = $1',
            [search_request]);
        console.log(results.rows);
        response.status(200).json(results.rows);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

async function search_series(request, response, next) {
    console.log('Searching of series');

    console.log(request.body.search_request);
    const search_request = request.body.search_request;

    try {
        const results = await pool.query('Select * from series where title_serie = $1',
            [search_request]);
        console.log(results.rows);
        response.status(200).json(results.rows);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}