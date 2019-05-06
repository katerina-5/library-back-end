const BookParser = require('./../parser/book_parser').BookParser;
const AuthorParser = require('./../parser/author_parser').AuthorParser;
const GenreParser = require('./../parser/genre_parser').GenreParser;
const SerieParser = require('./../parser/serie_parser').SerieParser;

const Book = require('./../parser_models/book').Book;
const Author = require('./../parser_models/author').Author;
const Genre = require('./../parser_models/genre').Genre;
const Serie = require('./../parser_models/serie').Serie;

module.exports = {
    parseBook,
    parseAuthor,
    parseGenre,
    parseSerie,
}

async function parseBook(url) {
    let bookParser = new BookParser(url);
    await bookParser.parseAllInformationAboutBook();

    let result = {
        book: {},
        authors: [],
        genres: [],
        serie: {}
    }

    let bookEntity = bookParser.Book;
    result.book = bookEntity.json;
    let authors = bookParser.Authors;
    authors.forEach(author => {
        result.authors.push(author.json);
    });
    let genres = bookParser.Genres;
    genres.forEach(genre => {
        result.genres.push(genre.json);
    })
    let serieEntity = bookParser.Serie;
    if (!(serieEntity == null)) {
        result.serie = serieEntity.json;
    } else {
        result.serie = JSON.parse({});
    }

    console.log("Parsed book: " + JSON.stringify(result.book));

    return result;
}

async function parseAuthor(url) {
    let authorParser = new AuthorParser(url);
    await authorParser.parseAllInformationAboutAuthor();

    let result = {
        author: {},
        // genres: []
    }

    let authorEntity = authorParser.Author;
    result.author = authorEntity.json;

    console.log("Parsed author: " + JSON.stringify(result.author));

    return result;
}

async function parseGenre(url) {
    let genreParser = new GenreParser(url);
    await genreParser.parseAllInformationAboutGenre();

    let result = {
        genre: {}
    }

    let genreEntity = genreParser.Genre;
    result.genre = genreEntity.json;

    console.log("Parsed genre: " + JSON.stringify(result.genre));

    return result;
}

async function parseSerie(url) {
    let serieParser = new SerieParser(url);
    await serieParser.parseAllInformationAboutSerie();

    let result = {
        serie: {},
        // authors: []
    }

    let serieEntity = serieParser.Serie;
    result.serie = serieEntity.json;

    console.log("Parsed serie: " + JSON.stringify(result.serie));

    return result;
}
