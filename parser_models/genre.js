class Genre {
    constructor() { }

    set idGenre(value) {
        this.id_genre = value;
    }

    set titleGenre(value) {
        this.title_genre = value;
    }

    set urlGenre(value) {
        this.url_genre = value;
    }

    set descriptionGenre(value) {
        this.description = value;
    }

    get json() {
        return {
            id_genre: this.id_genre,
            title_genre: this.title_genre,
            url_genre: this.url_genre,
            description: this.description
        };
    }
}

module.exports = {
    Genre
}
