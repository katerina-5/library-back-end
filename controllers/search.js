const pool = require('../config/postgresql').pool;

module.exports = {
    search_books,
    search_authors,
    search_genres,
    search_series
};

async function search_books(request, response, next) {
    console.log('Searching of books');

    console.log(request.body.search_request);
    const search_request = request.body.search_request;

    try {
        const synonyms = await pool.query(`select distinct word from words where id_word in
        (select first_word from synonyms where second_word = (select id_word from words where word = $1))
        or id_word in (select second_word from synonyms where first_word = (select id_word from words where word = $1));`, [search_request]);

        let words = [];
        words.push(search_request);
        if (synonyms.rowCount !== 0) {
            synonyms.rows.forEach(row => {
                words.push(row.word);
            });
        }
        console.log(words);

        let setBooks = new Set();
        let results = [];
        for (let i = 0; i < words.length; i++) {
            let word = words[i];

            const books = await pool.query(`Select * from books where title_book ilike $1 or description ilike $1
            OR to_tsvector(\'russian\', description) @@ to_tsquery(\'russian\', $2)
            OR to_tsvector(\'russian\', title_book) @@ to_tsquery(\'russian\', $2)
            OR id_book in (select id_book from bookhasauthor inner join authors using(id_author) where authors.full_name ilike $1 or authors.full_name_orig ilike $1)
            OR id_book in (select id_book from bookhasgenre inner join genres using(id_genre) where genres.title_genre ilike $1)`,
                ["%" + word + "%", word]);

            books.rows.forEach(book => {
                if (!setBooks.has(book.id_book)) {
                    setBooks.add(book.id_book);
                    results.push(book);
                }
            });
        }

        response.status(200).json(results);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

async function search_authors(request, response, next) {
    console.log('Searching of authors');

    console.log(request.body.search_request);
    const search_request = request.body.search_request;

    try {
        const synonyms = await pool.query(`select distinct word from words where id_word in
        (select first_word from synonyms where second_word = (select id_word from words where word = $1))
        or id_word in (select second_word from synonyms where first_word = (select id_word from words where word = $1));`, [search_request]);

        let words = [];
        words.push(search_request);
        if (synonyms.rowCount !== 0) {
            synonyms.rows.forEach(row => {
                words.push(row.word);
            });
        }
        console.log(words);

        let setAuthors = new Set();
        let results = [];
        for (let i = 0; i < words.length; i++) {
            let word = words[i];

            const authors = await pool.query(`Select * from authors where full_name ilike $1 OR full_name_orig ilike $1
            OR to_tsvector(\'russian\', full_name) @@ to_tsquery(\'russian\', $2)
            OR to_tsvector(\'russian\', full_name_orig) @@ to_tsquery(\'russian\', $2)
            OR to_tsvector(\'english\', full_name_orig) @@ to_tsquery(\'english\', $2)`,
                ["%" + word + "%", word]);

            authors.rows.forEach(author => {
                if (!setAuthors.has(author.id_author)) {
                    setAuthors.add(author.id_author);
                    results.push(author);
                }
            });
        }

        response.status(200).json(results);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

async function search_genres(request, response, next) {
    console.log('Searching of genres');

    console.log(request.body.search_request);
    const search_request = request.body.search_request;

    try {
        const synonyms = await pool.query(`select distinct word from words where id_word in
        (select first_word from synonyms where second_word = (select id_word from words where word = $1))
        or id_word in (select second_word from synonyms where first_word = (select id_word from words where word = $1));`, [search_request]);

        let words = [];
        words.push(search_request);
        if (synonyms.rowCount !== 0) {
            synonyms.rows.forEach(row => {
                words.push(row.word);
            });
        }
        console.log(words);

        let setGenres = new Set();
        let results = [];
        for (let i = 0; i < words.length; i++) {
            let word = words[i];

            const genres = await pool.query(`Select * from genres where title_genre ilike $1 or description ilike $1 
            OR to_tsvector(\'russian\', description) @@ to_tsquery(\'russian\', $2)
            OR to_tsvector(\'russian\', title_genre) @@ to_tsquery(\'russian\', $2)`,
                ["%" + word + "%", word]);

            genres.rows.forEach(genre => {
                if (!setGenres.has(genre.id_genre)) {
                    setGenres.add(genre.id_genre);
                    results.push(genre);
                }
            });
        }

        response.status(200).json(results);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

async function search_series(request, response, next) {
    console.log('Searching of series');

    console.log(request.body.search_request);
    const search_request = request.body.search_request;

    try {
        const synonyms = await pool.query(`select distinct word from words where id_word in
        (select first_word from synonyms where second_word = (select id_word from words where word = $1))
        or id_word in (select second_word from synonyms where first_word = (select id_word from words where word = $1));`, [search_request]);

        let words = [];
        words.push(search_request);
        if (synonyms.rowCount !== 0) {
            synonyms.rows.forEach(row => {
                words.push(row.word);
            });
        }
        console.log(words);

        let setSeries = new Set();
        let results = [];
        for (let i = 0; i < words.length; i++) {
            let word = words[i];

            const series = await pool.query(`Select * from series where lower(title_serie) like lower($1) or lower(description) like lower($1) 
            OR to_tsvector(\'russian\', description) @@ to_tsquery(\'russian\', $2)
            OR to_tsvector(\'russian\', title_serie) @@ to_tsquery(\'russian\', $2)`,
                ["%" + word + "%", word]);

            series.rows.forEach(serie => {
                if (!setSeries.has(serie.id_serie)) {
                    setSeries.add(serie.id_serie);
                    results.push(serie);
                }
            });
        }

        response.status(200).json(results);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}
