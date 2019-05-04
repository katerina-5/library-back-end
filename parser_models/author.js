class Author {
    constructor() { }

    set idAuthor(value) {
        this.id_author = value;
    }

    set urlAuthor(value) {
        this.url_author = value;
    }

    set fullName(value) {
        this.full_name = value;
    }

    set fullNameOrig(value) {
        this.full_name_orig = value;
    }

    set imageUrl(value) {
        this.image_url = value;
    }

    get json() {
        return {
            id_author: this.id_author,
            url_author: this.url_author,
            full_name: this.full_name,
            full_name_orig: this.full_name_orig,
            image_url: this.image_url
        };
    }
}

module.exports = {
    Author
}
