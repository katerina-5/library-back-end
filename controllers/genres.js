const pool = require('./../config/postgresql').pool;

module.exports = {
    genre_list,
    genre_detail,
    genre_create,
    genre_delete,
    genre_update,
    genre_books,
    genre_authors
};

// Display list of all genres.
async function genre_list(request, response, next) {
    console.log('List of genres');

    try {
        const results = await pool.query('SELECT * FROM genres ORDER BY id_genre');
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// Display detail page for a specific genre.
async function genre_detail(request, response, next) {
    console.log('Genre detail');

    try {
        const id_genre = request.params.id;

        const results = await pool.query('SELECT * FROM genres WHERE id_genre = $1', [id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// genre create on POST.
async function genre_create(request, response, next) {
    console.log('Genre create');

    try {
        const { title_genre, url_genre, description } = request.body;

        const results = await pool.query('INSERT INTO genres(title_genre, url_genre, description) VALUES($1, $2, $3)',
            [title_genre, url_genre, description]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// genre update on PUT.
async function genre_update(request, response, next) {
    console.log('Genre update');

    try {
        const id_genre = request.params.id;
        const { title_genre, url_genre, description } = request.body;

        const results = await pool.query('UPDATE genres SET title_genre = $2, url_genre = $3, description = $4 WHERE id_genre = $1',
            [id_genre, title_genre, url_genre, description]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// genre delete on DELETE.
async function genre_delete(request, response, next) {
    console.log('Genre delete');

    try {
        const id_genre = request.params.id;

        const results = await pool.query('DELETE FROM genres WHERE id_genre = $1', [id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all books of genre by id_genre
async function genre_books(request, response, next) {
    console.log('Genres\'s books');

    try {
        const id_genre = request.params.id;

        const results = await pool.query('select books.* from books inner join bookhasgenre using(id_book) inner join genres using(id_genre) where genres.id_genre = $1',
            [id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// get all authors of genre by id_genre
async function genre_authors(request, response, next) {
    console.log('Genres\'s authors');

    try {
        const id_genre = request.params.id;

        const results = await pool.query('select authors.* from authors inner join authorhasgenres using(id_author) inner join genres using(id_genre) where genres.id_genre = $1',
            [id_genre]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}
