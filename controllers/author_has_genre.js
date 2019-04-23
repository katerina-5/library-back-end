const pool = require('./../config/postgresql').pool;

module.exports = {
    author_has_genre_create,
    author_has_genre_delete,
    get_authors_of_genre,
    get_genres_of_author
}

// create relationship between Author and Genre
async function author_has_genre_create(request, response, next) {
    console.log('AuthorHasGenre create');

    try {
        const { id_author, id_genre } = request.body;

        const results = await pool.query('INSERT INTO authorhasgenre(id_author, id_genre) VALUES($1, $2)', [id_author, id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// delete relationship between Author and Genre
async function author_has_genre_delete(request, response, next) {
    console.log('AuthorHasGenre delete');

    try {
        const { id_author, id_genre } = request.body;

        const results = await pool.query('DELETE FROM authorhasgenre WHERE id_author = $1 AND id_genre = $2', [id_author, id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all authors of this genre
async function get_authors_of_genre(request, response, next) {
    console.log('get all authors of this genre (AuthorHasGenre)');

    try {
        const id_genre = request.params.id;

        const results = await pool.query('SELECT * FROM authors WHERE id_author IN (SELECT id_author FROM authorhasgenre WHERE id_genre = $1)',
            [id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all genres of this author
async function get_genres_of_author(request, response, next) {
    console.log('get all genres of this author (AuthorHasGenre)');

    try {
        const id_author = request.params.id;

        const results = await pool.query('SELECT * FROM genres WHERE id_genre IN (SELECT id_genre FROM authorhasgenre WHERE id_author = $1)',
            [id_author]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}
