const pool = require('./../config/postgresql').pool;

module.exports = {
    author_list,
    author_detail,
    author_create,
    author_delete,
    author_update
};

// Display list of all authors.
async function author_list(request, response, next) {
    console.log('List of authors');

    try {
        const results = await pool.query('SELECT * FROM authors ORDER BY id_author');
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// Display detail page for a specific author.
async function author_detail(request, response, next) {
    console.log('Author detail');

    try {
        const id_author = request.params.id;

        const results = await pool.query('SELECT * FROM authors WHERE id_author = $1', [id_author]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// author create on POST.
async function author_create(request, response, next) {
    console.log('Author create');

    try {
        const { url_author, full_name, full_name_orig, image_url } = request.body;

        const results = await pool.query('INSERT INTO authors(url_author, full_name, full_name_orig, image_url) VALUES($1, $2, $3, $4)',
            [url_author, full_name, full_name_orig, image_url]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// author update on PUT.
async function author_update(request, response, next) {
    console.log('Author update');

    try {
        const id_author = request.params.id;
        const { url_author, full_name, full_name_orig, image_url } = request.body;

        const results = await pool.query('UPDATE authors SET url_author = $2, full_name = $3, full_name_orig = $4, image_url = $5 WHERE id_author = $1',
            [id_author, url_author, full_name, full_name_orig, image_url]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// author delete on DELETE.
async function author_delete(request, response, next) {
    console.log('Author delete');

    try {
        const id_author = request.params.id;

        const results = await pool.query('DELETE FROM authors WHERE id_author = $1', [id_author]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}
