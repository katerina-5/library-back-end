class Serie {
    constructor() { }

    set idSerie(value) {
        this.id_serie = value;
    }

    set titleSerie(value) {
        this.title_serie = value;
    }

    set urlSerie(value) {
        this.url_serie = value;
    }

    set descriptionSerie(value) {
        this.description = value;
    }

    get json() {
        return {
            id_serie: this.id_serie,
            title_serie: this.title_serie,
            url_serie: this.url_serie,
            description: this.description
        };
    }
}

module.exports = {
    Serie
}
