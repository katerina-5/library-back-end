const pool = require('./../config/postgresql').pool;

module.exports = {
    favourite_serie_create,
    favourite_serie_delete,
    get_favourite_series
}

// create favourite serie
async function favourite_serie_create(request, response, next) {
    console.log('Favourite serie create');

    try {
        const { id_user, id_serie } = request.body;

        const results = await pool.query('INSERT INTO favouriteseries(id_user, id_serie) VALUES($1, $2)', [id_user, id_serie]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// delete favourite serie
async function favourite_serie_delete(request, response, next) {
    console.log('Favourite serie delete');

    try {
        const { id_user, id_serie } = request.body;

        const results = await pool.query('DELETE FROM favouriteseries WHERE id_user = $1 AND id_serie = $2', [id_user, id_serie]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all favourite series
async function get_favourite_series(request, response, next) {
    console.log('List of favourite series');

    try {
        const id_user = request.params.id;

        const results = await pool.query('SELECT * FROM series WHERE id_serie IN (SELECT id_serie FROM favouriteseries WHERE id_user = $1)',
            [id_user]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}