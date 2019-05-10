const pool = require('../config/postgresql').pool;

const libParser = require('./../libs/parser');

module.exports = {
    parse_book,
    parse_author,
    parse_genre,
    parse_serie
};

async function parse_book(request, response, next) {
    console.log('Parsing of book');

    console.log(request.body.url);
    let json = await libParser.parseBook(request.body.url);

    try {
        // BOOK
        let id_book = null;
        const { title_book, url_book, image_url, year, description, rating } = json.book;
        let checkBook = await pool.query('SELECT id_book FROM books WHERE url_book = $1',
            [url_book]);
        if (checkBook.rowCount === 0) {
            // insert into books
            const addBook = await pool.query('insert into books(title_book, url_book, image_url, year, description, rating) values($1, $2, $3, $4, $5, $6)',
                [title_book, url_book, image_url, year, description, rating]);
            // check book again
            checkBook = await pool.query('SELECT id_book FROM books WHERE url_book = $1',
                [url_book]);
        } else {
            // update books
            const editBook = await pool.query('update books set title_book = $2, url_book = $3, image_url = $4, year = $5, description = $6, rating = $7 where id_book = $1',
                [id_book, title_book, url_book, image_url, year, description, rating]);
        }
        id_book = checkBook.rows[0].id_book;

        // SERIE
        let id_serie = null;
        if (json.serie !== JSON.parse('{}')) {
            // console.log('CONGRATULATIONS! Serie exists.');

            const { title_serie, url_serie, description } = json.serie;
            if (title_serie !== null) {
                let checkSerie = await pool.query('SELECT id_serie FROM series WHERE url_serie = $1',
                    [url_serie]);
                if (checkSerie.rowCount === 0) {
                    // insert into series
                    const addSerie = await pool.query('insert into series(title_serie, url_serie, description) values($1, $2, $3)',
                        [title_serie, url_serie, description]);
                    // check serie again
                    checkSerie = await pool.query('SELECT id_serie FROM series WHERE url_serie = $1',
                        [url_serie]);

                    const updateBook = await pool.query('update books set id_serie = $2 where id_book = $1',
                        [id_book, checkSerie.rows[0].id_serie]);
                } else {
                    // update series
                    const editSerie = await pool.query('update series set title_serie = $2, url_serie = $3, description = $4 where id_serie = $1',
                        [checkSerie.rows[0].id_serie, title_serie, url_serie, description]);

                    const updateBook = await pool.query('update books set id_serie = $2 where id_book = $1',
                        [id_book, checkSerie.rows[0].id_serie]);
                }
                id_serie = checkSerie.rows[0].id_serie;
            }
        }

        // AUTHORS
        let authors_id = [];
        await asyncForEach(json.authors, async (author) => {
            const { full_name, full_name_orig, url_author, image_url } = author;
            let checkAuthor = await pool.query('SELECT id_author FROM authors WHERE url_author = $1',
                [url_author]);
            if (checkAuthor.rowCount === 0) {
                // insert into authors
                const addAuthor = await pool.query('insert into authors(full_name, full_name_orig, url_author, image_url) values($1, $2, $3, $4)',
                    [full_name, full_name_orig, url_author, image_url]);
                // check author again
                checkAuthor = await pool.query('SELECT id_author FROM authors WHERE url_author = $1',
                    [url_author]);
            } else {
                // update authors
                const editAuthor = await pool.query('update authors set full_name = $2, full_name_orig = $3, url_author = $4, image_url = $5 where id_author = $1',
                    [checkAuthor.rows[0].id_author, full_name, full_name_orig, url_author, image_url]);
            }
            authors_id.push(checkAuthor.rows[0].id_author);
        });

        // GENRES
        let genres_id = [];
        await asyncForEach(json.genres, async (genre) => {
            const { title_genre, url_genre, description } = genre;
            let checkGenre = await pool.query('SELECT id_genre FROM genres WHERE url_genre = $1',
                [url_genre]);
            if (checkGenre.rowCount === 0) {
                // insert into genres
                const addGenre = await pool.query('insert into genres(title_genre, url_genre, description) values($1, $2, $3)',
                    [title_genre, url_genre, description]);
                // check genre again
                checkGenre = await pool.query('SELECT id_genre FROM genres WHERE url_genre = $1',
                    [url_genre]);
            } else {
                // update genres
                const editGenre = await pool.query('update genres set title_genre = $2, url_genre = $3, description = $4 where id_genre = $1',
                    [checkGenre.rows[0].id_genre, title_genre, url_genre, description]);
            }
            genres_id.push(checkGenre.rows[0].id_genre);
        });

        if (!(id_serie === null)) {
            await asyncForEach(authors_id, async (id_author) => {
                // check serie-author
                const checkSerieAuthor = await pool.query('select * from seriehasauthors where id_serie = $1 and id_author = $2', [id_serie, id_author]);
                if (checkSerieAuthor.rowCount === 0) {
                    // insert into SerieHasAuthor
                    await pool.query('insert into seriehasauthors(id_serie, id_author) values($1, $2)', [id_serie, id_author]);
                }
            });
        }

        await asyncForEach(authors_id, async (id_author) => {
            // check book-author
            const checkBookAuthor = await pool.query('select * from bookhasauthor where id_book = $1 and id_author = $2', [id_book, id_author]);
            if (checkBookAuthor.rowCount === 0) {
                // insert into BookHasAuthor
                await pool.query('insert into bookhasauthor(id_book, id_author) values($1, $2)', [id_book, id_author]);
            }

            await asyncForEach(genres_id, async (id_genre) => {
                // check author-genre
                const checkAuthorGenre = await pool.query('select * from authorhasgenres where id_author = $1 and id_genre = $2', [id_author, id_genre]);
                if (checkAuthorGenre.rowCount === 0) {
                    // insert into AuthorHasGenre
                    await pool.query('insert into authorhasgenres(id_author, id_genre) values($1, $2)', [id_author, id_genre]);
                }
            });
        });

        await asyncForEach(genres_id, async (id_genre) => {
            // check book-genre
            const checkBookGenre = await pool.query('select * from bookhasgenre where id_book = $1 and id_genre = $2', [id_book, id_genre]);
            if (checkBookGenre.rowCount === 0) {
                // insert into BookHasGenre
                await pool.query('insert into bookhasgenre(id_book, id_genre) values($1, $2)', [id_book, id_genre]);
            }
        });

        // RETURN THIS PARSED BOOK
        const results = await pool.query('SELECT * FROM books WHERE id_book = $1',
            [id_book]);
        console.log(results.rows);
        response.status(200).json(results.rows);

        // response.status(200).json(json);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function parse_author(request, response, next) {
    console.log('Parsing of author');

    console.log(request.body.url);
    const json = await libParser.parseAuthor(request.body.url);
    // const { id_serie, title_book, url_book, image_url, year, description, rating } = json.book;

    try {
        const checkAuthor = await pool.query('SELECT id_author FROM authors WHERE url_author = $1',
            [json.author.url_author]);
        if (checkAuthor.rowCount === 0) {
            // insert into authors
            // check author again
        } else {
            // update authors
            id_author = checkAuthor.rows[0].id_author;
        }

        // RETURN THIS PARSED AUTHOR
        const results = await pool.query('SELECT * FROM authors WHERE id_author = $1',
            [id_author]);
        console.log(results.rows);
        response.status(200).json(results.rows);

        // response.status(200).json(json.author);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

async function parse_genre(request, response, next) {
    console.log('Parsing of genre');

    console.log(request.body.url);
    const json = await libParser.parseGenre(request.body.url);
    // const { id_serie, title_book, url_book, image_url, year, description, rating } = json.book;

    try {
        const checkGenre = await pool.query('SELECT id_genre FROM genres WHERE url_genre = $1',
            [json.genre.url_genre]);
        if (checkGenre.rowCount === 0) {
            // insert into genres
            // check genre again
        } else {
            // update genres
            id_genre = checkGenre.rows[0].id_genre;
        }

        // RETURN THIS PARSED GENRE
        const results = await pool.query('SELECT * FROM genres WHERE id_genre = $1',
            [id_genre]);
        console.log(results.rows);
        response.status(200).json(results.rows);

        // response.status(200).json(json.genre);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

async function parse_serie(request, response, next) {
    console.log('Parsing of serie');

    console.log(request.body.url);
    const json = await libParser.parseSerie(request.body.url);
    // const { id_serie, title_book, url_book, image_url, year, description, rating } = json.book;

    try {
        const checkSerie = await pool.query('SELECT id_serie FROM series WHERE url_serie = $1',
            [json.serie.url_serie]);
        if (checkSerie.rowCount === 0) {
            // insert into series
            // check serie again
        } else {
            // update series
            id_serie = checkSerie.rows[0].id_serie;
        }

        // RETURN THIS PARSED SERIE
        const results = await pool.query('SELECT * FROM series WHERE id_serie = $1',
            [id_serie]);
        console.log(results.rows);
        response.status(200).json(results.rows);

        // response.status(200).json(json.serie);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
