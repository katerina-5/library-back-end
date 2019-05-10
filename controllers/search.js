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
        const results = await pool.query('Select * from books where lower(title_book) like lower($1) or lower(description) like lower($1)',
            ["%" + search_request + "%"]);
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
        const results = await pool.query('Select * from authors where lower(full_name) like lower($1) or lower(full_name_orig) like lower($1)',
            ["%" + search_request + "%"]);
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
        const results = await pool.query('Select * from genres where lower(title_genre) like lower($1) or lower(description) like lower($1)',
            ["%" + search_request + "%"]);
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
        const results = await pool.query('Select * from series where lower(title_serie) like lower($1) or lower(description) like lower($1)',
            ["%" + search_request + "%"]);
        console.log(results.rows);
        response.status(200).json(results.rows);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}