const pool = require('./../config/postgresql').pool;
const authLib = require('../libs/favourite');

module.exports = {
    favourite_serie_create,
    favourite_serie_delete,
    get_favourite_series,
    check_serie
}

// create favourite serie
async function favourite_serie_create(request, response, next) {
    console.log('Favourite serie create');

    let token = request.body.token;
    const id_user = await authLib.getIdUserFromToken(token, next);
    const id_serie = request.body.id_serie;

    try {
        const results = await pool.query('INSERT INTO favouriteseries(id_user, id_serie) VALUES($1, $2)', [id_user, id_serie]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// delete favourite serie
async function favourite_serie_delete(request, response, next) {
    console.log('Favourite serie delete');

    let token = request.body.token;
    const id_user = await authLib.getIdUserFromToken(token, next);
    const id_serie = request.body.id_serie;

    try {
        const results = await pool.query('DELETE FROM favouriteseries WHERE id_user = $1 AND id_serie = $2', [id_user, id_serie]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all favourite series
async function get_favourite_series(request, response, next) {
    console.log('List of favourite series');

    const token = request.params.token;
    const id_user = await authLib.getIdUserFromToken(token, next);

    try {
        const results = await pool.query('SELECT * FROM series WHERE id_serie IN (SELECT id_serie FROM favouriteseries WHERE id_user = $1)',
            [id_user]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// check serie in favourite series
async function check_serie(request, response, next) {
    console.log('Check serie in favourite series');

    let token = request.body.token;
    const id_user = await authLib.getIdUserFromToken(token, next);
    const id_serie = request.body.id_serie;

    try {
        const results = await pool.query('select * from favouriteseries where id_user = $1 and id_serie = $2', [id_user, id_serie]);
        if (results.rowCount != 0) {
            response.status(200).json(true);
        } else {
            response.status(200).json(false);
        }
    } catch (error) {
        next(error);
    }
}
