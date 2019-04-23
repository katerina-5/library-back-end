const pool = require('./../config/postgresql').pool;

module.exports = {
    serie_has_author_create,
    serie_has_author_delete,
    get_series_of_author,
    get_authors_of_serie
}

// create relationship between Serie and Author
async function serie_has_author_create(request, response, next) {
    console.log('SerieHasAuthor create');

    try {
        const { id_serie, id_author } = request.body;

        const results = await pool.query('INSERT INTO seriehasauthor(id_serie, id_author) VALUES($1, $2)', [id_serie, id_author]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// delete relationship between Serie and Author
async function serie_has_author_delete(request, response, next) {
    console.log('SerieHasAuthor delete');

    try {
        const { id_serie, id_author } = request.body;

        const results = await pool.query('DELETE FROM seriehasauthor WHERE id_serie = $1 AND id_author = $2', [id_serie, id_author]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all series of this author
async function get_series_of_author(request, response, next) {
    console.log('get all series of this author (SerieHasAuthor)');

    try {
        const id_author = request.params.id;

        const results = await pool.query('SELECT * FROM series WHERE id_serie IN (SELECT id_serie FROM seriehasauthor WHERE id_author = $1)',
            [id_author]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all authors of this serie
async function get_authors_of_serie(request, response, next) {
    console.log('get all authors of this serie (SerieHasAuthor)');

    try {
        const id_serie = request.params.id;

        const results = await pool.query('SELECT * FROM authors WHERE id_author IN (SELECT id_author FROM seriehasauthor WHERE id_serie = $1)',
            [id_serie]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}
