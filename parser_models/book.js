class Book {
    constructor() { }

    set idSerie(value) {
        this.id_serie = value;
    }

    set titleBook(value) {
        this.title_book = value;
    }

    set urlBook(value) {
        this.url_book = value;
    }

    set imageUrl(value) {
        this.image_url = value;
    }

    set yearBook(value) {
        this.year = value;
    }

    set descriptionBook(value) {
        this.description = value;
    }

    set ratingBook(value) {
        this.rating = value;
    }

    get json() {
        return {
            id_book: this.id_book,
            id_serie: this.id_serie,
            title_book: this.title_book,
            url_book: this.url_book,
            image_url: this.image_url,
            year: this.year,
            description: this.description,
            rating: this.rating
        };
    }
}

module.exports = {
    Book
}
