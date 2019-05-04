const Parser = require('./parser').Parser;
const Genre = require('./../parser_models/genre').Genre;

class GenreParser extends Parser {
    constructor(url) {
        super(url);
    }

    get Genre() {
        return this.genre;
    }

    async parseAllInformationAboutGenre() {
        this.html = await super.mainParseMethod(this.url);

        let genreEntity = new Genre();
        genreEntity.urlGenre = this.url;
        // parse title
        genreEntity.titleGenre = this.parseGenreTitle();
        // parse description
        genreEntity.descriptionGenre = this.parseGenreDescription();

        this.genre = genreEntity;
    }

    parseGenreTitle() {
        let title = "";

        const information = "section-title-head";
        let result = super.findInformation(this.html, information, "><h1>", "</h1>");
        result = result.replace("<h1>", "");

        title = result;

        return title;
    }

    parseGenreDescription() {
        let description = "";

        const information = "seo--genre-description";
        let result = super.findInformation(this.html, information, ">", "</p>");
        result = result.replace("\\s{3,}", "");
        result = result.replace("<a href=\"\\S*\">", "");
        result = result.replace("</a>", "");
        result = result.replace(/\n/g, " ");
        result = result.replace(/\s{3,}/g, "");

        description = result;

        return description;
    }
}

module.exports = {
    GenreParser
}
