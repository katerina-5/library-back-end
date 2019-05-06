const pool = require('./../config/postgresql').pool;

module.exports = {
    serie_list,
    serie_detail,
    serie_create,
    serie_delete,
    serie_update,
    serie_books,
    serie_authors
};

// Display list of all series.
async function serie_list(request, response, next) {
    console.log('List of series');

    try {
        const results = await pool.query('SELECT * FROM series ORDER BY id_serie');
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// Display detail page for a specific serie.
async function serie_detail(request, response, next) {
    console.log('Serie detail');

    try {
        const id_serie = request.params.id;

        const results = await pool.query('SELECT * FROM series WHERE id_serie = $1', [id_serie]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// serie create on POST.
async function serie_create(request, response, next) {
    console.log('Serie create');

    try {
        const { title_serie, url_serie, description } = request.body;

        const results = await pool.query('INSERT INTO series(title_serie, url_serie, description) VALUES($1, $2, $3)',
            [title_serie, url_serie, description]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// serie update on PUT.
async function serie_update(request, response, next) {
    console.log('Serie update');

    try {
        const id_serie = request.params.id;
        const { title_serie, url_serie, description } = request.body;

        const results = await pool.query('UPDATE series SET title_serie = $2, url_serie = $3, description = $4 WHERE id_serie = $1',
            [id_serie, title_serie, url_serie, description]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// serie delete on DELETE.
async function serie_delete(request, response, next) {
    console.log('Serie delete');

    try {
        const id_serie = request.params.id;

        const results = await pool.query('DELETE FROM series WHERE id_serie = $1', [id_serie]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all books of serie by id_serie
async function serie_books(request, response, next) {
    console.log('Serie\'s books');

    try {
        const id_serie = request.params.id;

        const results = await pool.query('select * from books where id_serie = $1',
            [id_serie]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all authors of serie by id_serie
async function serie_authors(request, response, next) {
    console.log('Serie\'s authors');

    try {
        const id_serie = request.params.id;

        const results = await pool.query('select authors.* from series inner join seriehasauthors using(id_serie) inner join authors using(id_author) where series.id_serie = $1',
            [id_serie]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}
