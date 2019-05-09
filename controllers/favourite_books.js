const pool = require('./../config/postgresql').pool;
const authLib = require('../libs/favourite');

module.exports = {
    favourite_book_create,
    favourite_book_delete,
    get_favourite_books
}

// create favourite book
async function favourite_book_create(request, response, next) {
    console.log('Favourite book create');

    let token = request.body.token;
    const id_user = await authLib.getIdUserFromToken(token, next);
    const id_book = request.body.id_book;

    try {
        const results = await pool.query('INSERT INTO favouritebooks(id_user, id_book) VALUES($1, $2)', [id_user, id_book]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// delete favourite book
async function favourite_book_delete(request, response, next) {
    console.log('Favourite book delete');

    let token = request.body.token;
    const id_user = await authLib.getIdUserFromToken(token, next);
    const id_book = request.body.id_book;

    try {
        const results = await pool.query('DELETE FROM favouritebooks WHERE id_user = $1 AND id_book = $2', [id_user, id_book]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all favourite books
async function get_favourite_books(request, response, next) {
    console.log('List of favourite books');

    try {
        const id_user = request.params.id;

        const results = await pool.query('SELECT * FROM books WHERE id_book IN (SELECT id_book FROM favouritebooks WHERE id_user = $1)',
            [id_user]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}
