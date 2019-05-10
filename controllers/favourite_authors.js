const pool = require('./../config/postgresql').pool;
const authLib = require('../libs/auth');

module.exports = {
    favourite_author_create,
    favourite_author_delete,
    get_favourite_authors,
    check_author
}

// create favourite author
async function favourite_author_create(request, response, next) {
    console.log('Favourite author create');

    let token = request.body.token;

    authLib.checkToken(token, response);

    const id_user = await authLib.getIdUserFromToken(token, next);
    const id_author = request.body.id_author;

    try {
        const results = await pool.query('INSERT INTO favouriteauthors(id_user, id_author) VALUES($1, $2)', [id_user, id_author]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// delete favourite author
async function favourite_author_delete(request, response, next) {
    console.log('Favourite author delete');

    let token = request.body.token;

    authLib.checkToken(token, response);

    const id_user = await authLib.getIdUserFromToken(token, next);
    const id_author = request.body.id_author;

    try {
        const results = await pool.query('DELETE FROM favouriteauthors WHERE id_user = $1 AND id_author = $2', [id_user, id_author]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all favourite authors
async function get_favourite_authors(request, response, next) {
    console.log('List of favourite authors');

    const token = request.params.token;

    authLib.checkToken(token, response);

    const id_user = await authLib.getIdUserFromToken(token, next);

    try {
        const results = await pool.query('SELECT * FROM authors WHERE id_author IN (SELECT id_author FROM favouriteauthors WHERE id_user = $1)',
            [id_user]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// check author in favourite authors
async function check_author(request, response, next) {
    console.log('Check author in favourite authors');

    let token = request.body.token;

    authLib.checkToken(token, response);

    const id_user = await authLib.getIdUserFromToken(token, next);
    const id_author = request.body.id_author;

    try {
        const results = await pool.query('select * from favouriteauthors where id_user = $1 and id_author = $2', [id_user, id_author]);
        if (results.rowCount != 0) {
            response.status(200).json(true);
        } else {
            response.status(200).json(false);
        }
    } catch (error) {
        next(error);
    }
}
