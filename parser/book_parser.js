const Parser = require('./parser').Parser;
const AuthorParser = require('./author_parser').AuthorParser;
const GenreParser = require('./genre_parser').GenreParser;
const SerieParser = require('./serie_parser').SerieParser;
const Book = require('./../parser_models/book').Book;
const Author = require('./../parser_models/author').Author;
const Genre = require('./../parser_models/genre').Genre;
const Serie = require('./../parser_models/serie').Serie;

class BookParser extends Parser {
    constructor(url) {
        super(url);
    }

    get Book() {
        return this.book;
    }

    get Authors() {
        return this.authors;
    }

    get Genres() {
        return this.genres;
    }

    get Serie() {
        return this.serie;
    }

    async parseAllInformationAboutBook() {
        this.html = await super.mainParseMethod(this.url);

        let bookEntity = new Book();
        // parse book title
        bookEntity.titleBook = this.parseBookTitle();
        bookEntity.urlBook = this.url;
        // parse year of book
        bookEntity.yearBook = this.parseBookYear();
        // parse description
        bookEntity.descriptionBook = this.parseBookDescription();
        // parse rating
        bookEntity.ratingBook = this.parseBookRating();
        // parse image url
        bookEntity.imageUrl = this.parseBookImage();
        bookEntity.idSerie = null;

        this.book = bookEntity;
        // parse authors
        this.authors = await this.parseBookAuthors();
        // parse genres
        this.genres = await this.parseBookGenres();
        // parse serie of book
        this.serie = await this.parseBookSerie();
    }

    parseBookTitle() {
        let title = "";

        const information = "book-article--title";
        let result = super.findInformation(this.html, information, ">", "<");

        title = result;

        return title;
    }

    parseBookYear() {
        let year = 0;

        const information = "год написания:";
        let result = super.findInformation(this.html, information, "class=\"row-value\">", "<");
        result = result.replace("lass=\"row-value\">", "");

        year = parseInt(result);

        return year;
    }

    parseBookDescription() {
        let description = "";

        const information = "book-article--description";
        let result = super.findInformation(this.html, information, " <p>", "</div>");
        result = result.replace(/<p>/g, "");
        result = result.replace(/<\/p>/g, "");
        result = result.replace(/<br \/>/g, " ");
        result = result.replace(/<a href=\"\S*\">/g, "");
        result = result.replace(/<a  href=\"\S*\">/g, "");
        result = result.replace(/<a\s{1,}href=\"\S*\">/g, "");
        result = result.replace(/<\/a>/g, "");
        result = result.replace(/\n/g, " ");
        result = result.replace(/\s{3,}/g, "");

        description = result;

        return description;
    }

    parseBookRating() {
        let rating = 0;

        const information = "book-profile--rate";
        let result = super.findInformation(this.html, information, ">", "<");
        result = result.replace(",", ".");

        rating = parseFloat(result);

        return rating;
    }

    parseBookImage() {
        let imageUrl = "";

        const information = "book-article--img";
        let result = super.findInformation(this.html, information, "<img ", "alt");
        result = result.replace("img ", "");
        result = result.replace("src=\"", "");
        result = result.replace("\"", "");
        result = result.replace(/\n/g, "");
        result = result.replace(/\s/g, "");

        imageUrl = 'http://readly.ru' + result;

        return imageUrl;
    }

    async parseBookSerie() {
        let serie = new Serie();

        const information = "серия книг:";
        if (this.html.indexOf(information) == -1) {
            return null;
        }

        let result = super.findInformation(this.html, information, " href=\"", "</a>");

        let arr = result.split(">");
        arr[0] = arr[0].replace("href=", "");
        arr[0] = arr[0].replace(/\"/g, "");
        let url = "http://readly.ru" + arr[0];

        // parse serie by SerieParser
        let serieParser = new SerieParser(url);
        await serieParser.parseAllInformationAboutSerie();
        // serie = result of work SerieParser
        serie = serieParser.Serie;
        // serie = url;

        return serie;
    }

    async parseBookAuthors() {
        let authors = [];

        const information = "Автор книги:";
        let result = super.findInformation(this.html, information, ">", "</div>");
        result = result.replace(/\n/g, "");
        result = result.replace(/\s{3,}/g, "");

        let arr = result.split(",");
        await this.asyncForEach(arr, async (str) => {
            let inf = str.split("><");

            // url of author
            inf[0] = inf[0].replace("<a href=\"", "");
            inf[0] = inf[0].replace("\"", "");

            let url = "http://readly.ru" + inf[0];

            // parse author by AuthorParser
            let authorParser = new AuthorParser(url);
            await authorParser.parseAllInformationAboutAuthor();
            // author = result of work AuthorParser
            let author = authorParser.Author;

            authors.push(author);
            // authors.push(url);
        });

        return authors;
    }

    async parseBookGenres() {
        let genres = [];

        const information = "жанры:";
        let result = super.findInformation(this.html, information, "<span class=\"row-value\">", "</span>");
        result = result.replace(/\n/g, "");
        result = result.replace(/\s{3,}/g, "");
        result = result.replace("span class=\"row-value\">", "");

        let arr = result.split(",");
        await this.asyncForEach(arr, async (str) => {
            let inf = str.split("\">");
            // url of genre
            inf[0] = inf[0].replace("<a href=\"", "");

            let url = "http://readly.ru" + inf[0];

            // parse genre by GenreParser
            let genreParser = new GenreParser(url);
            await genreParser.parseAllInformationAboutGenre();
            // genre = result of work GenreParser
            let genre = genreParser.Genre;

            genres.push(genre);
            // genres.push(url);
        });

        return genres;
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
}

module.exports = {
    BookParser
}
