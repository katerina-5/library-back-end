const pool = require('./../config/postgresql').pool;
const authLib = require('../libs/favourite');

module.exports = {
    favourite_genre_create,
    favourite_genre_delete,
    get_favourite_genres
}

// create favourite genre
async function favourite_genre_create(request, response, next) {
    console.log('Favourite genre create');

    let token = request.body.token;
    const id_user = await authLib.getIdUserFromToken(token, next);
    const id_genre = request.body.id_genre;

    try {
        const results = await pool.query('INSERT INTO favouritegenres(id_user, id_genre) VALUES($1, $2)', [id_user, id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// delete favourite genre
async function favourite_genre_delete(request, response, next) {
    console.log('Favourite genre delete');

    let token = request.body.token;
    const id_user = await authLib.getIdUserFromToken(token, next);
    const id_genre = request.body.id_genre;

    try {
        const results = await pool.query('DELETE FROM favouritegenres WHERE id_user = $1 AND id_genre = $2', [id_user, id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all favourite genres
async function get_favourite_genres(request, response, next) {
    console.log('List of favourite genres');

    try {
        const id_user = request.params.id;

        const results = await pool.query('SELECT * FROM genres WHERE id_genre IN (SELECT id_genre FROM favouritegenres WHERE id_user = $1)',
            [id_user]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}
