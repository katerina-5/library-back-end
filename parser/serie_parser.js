const Parser = require('./parser').Parser;
const Serie = require('./../parser_models/serie').Serie;

class SerieParser extends Parser {
    constructor(url) {
        super(url);
    }

    get Serie() {
        return this.serie;
    }

    async parseAllInformationAboutSerie() {
        this.html = await super.mainParseMethod(this.url);

        let serieEntity = new Serie();
        serieEntity.urlSerie = this.url;
        // parse title
        serieEntity.titleSerie = this.parseSerieTitle();
        // parse description
        serieEntity.descriptionSerie = this.parseSerieDescription();

        this.serie = serieEntity;
    }

    parseSerieTitle() {
        let title = "";

        const information = "series-detail-name";
        let result = super.findInformation(this.html, information, ">", "<");
        result = result.replace("Серия ", "");

        title = result;

        return title;
    }

    parseSerieDescription() {
        let description = "";

        const information = "series-detail-description";
        let result = super.findInformation(this.html, information, " <p><p>", "</p></p>");
        result = result.replace(/<p>/g, "");
        result = result.replace(/<\/p>/g, "");
        result = result.replace(/<br \/>/g, " ");
        result = result.replace(/<a  href=\"\S*\">/g, "");
        result = result.replace(/<\/a>/g, "");
        result = result.replace(/\n/g, " ");
        result = result.replace(/\s{3,}/g, "");

        description = result;

        return description;
    }
}

module.exports = {
    SerieParser
}
