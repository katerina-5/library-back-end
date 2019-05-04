const Parser = require('./parser').Parser;
const Author = require('./../parser_models/author').Author;

class AuthorParser extends Parser {
    constructor(url) {
        super(url);
    }

    get Author() {
        return this.author;
    }

    async parseAllInformationAboutAuthor() {
        this.html = await super.mainParseMethod(this.url);

        let authorEntity = new Author();
        authorEntity.urlAuthor = this.url;
        // parse full name
        authorEntity.fullName = this.parseAuthorFullName();
        // parse full name original
        authorEntity.fullNameOrig = this.parseAuthorFullNameOriginal();
        // parse url of image
        authorEntity.imageUrl = this.parseAuthorImageUrl();

        // parse genres for this author - ?????
        // this.parseAuthorGenres();

        this.author = authorEntity;
    }

    parseAuthorFullName() {
        let fullName = "";

        const information = "itemprop=\"name\"";
        let result = super.findInformation(this.html, information, ">", "<");

        fullName = result;

        return fullName;
    }

    parseAuthorFullNameOriginal() {
        let fullNameOrig = "";

        const information = "class=\"author-name\"";
        let result = super.findInformation(this.html, information, ">", "<");

        fullNameOrig = result;

        return fullNameOrig;
    }

    parseAuthorImageUrl() {
        let imageUrl = "";

        const information = "book-article--img";
        let result = super.findInformation(this.html, information, "<img src=\"", " alt=");
        result = result.replace("img src=\"", "");
        result = result.replace("\"", "");

        imageUrl = 'http://readly.ru' + result;

        return imageUrl;
    }
}

module.exports = {
    AuthorParser
}
