const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

class Parser {
    constructor(url) {
        this.url = url;
        this.html = null;

        // get html from url
        // this.mainParseMethod();
    }

    async mainParseMethod(url) {
        // get information from html
        // print all parsed information
        // or return entity

        let html = "";

        return new Promise((resolve, reject) => {
            try {
                this.getHtmlFromUrl(url, function (err, data) {
                    console.log("Main parser method. URL = " + url);
                    if (err !== null) {
                        console.log('Something went wrong: ' + err);
                        resolve("");
                    } else {
                        html = data;
                        resolve(html);
                    }
                });
            } catch (error) {
                console.log(error.message);
                reject(error);
            }
        });
    }

    async getHtmlFromUrl(url, callback) {
        console.log(url);
        let xhr = new XMLHttpRequest();
        await xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            let status = xhr.status;
            if (status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback(status, xhr.responseText);
            }
        };
        xhr.send();
    }

    findInformation(html, information, targetStart, targetEnd) {
        let start = html.indexOf(information);

        start = this.findPosition(html, start, targetStart);
        let end = this.findPosition(html, start, targetEnd);

        return html.substring(start + 1, end);
    }

    findPosition(html, start, target) {
        let positionResult = 0;

        let pos = 0;
        while (true) {
            let foundPos = html.indexOf(target, pos);
            if (foundPos == -1)
                break;

            if (foundPos > start) {
                positionResult = foundPos;
                break;
            }

            pos = foundPos + 1;
        }

        return positionResult;
    }
}

module.exports = {
    Parser
}
