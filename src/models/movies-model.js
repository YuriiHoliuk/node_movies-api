const fs = require('fs');
const path = require('path');
// const { promisify } = require('util');

function promisify(fn) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (err, data) => {
                err
                    ? reject(err)
                    : resolve(data);
            });
        });
    };
}

const readFile = promisify(fs.readFile);
const JSON_PATH = path.join(__dirname, '../../data.json');

class MoviesModel {
    constructor(jsonPath = JSON_PATH) {
        this.jsonPath = jsonPath;
    }

    async getList() {
        const fileContent = await readFile(this.jsonPath);

        return JSON.parse(fileContent).sort((film1, film2) => {
            return Number(film1.year) - Number(film2.year);
        });
    }

    async getMovieById(movieId) {
        const fileContent = await readFile(this.jsonPath);
  
        return JSON.parse(fileContent)
            .find(({ id }) => id === movieId);
    }
}

const moviesModel = new MoviesModel();

module.exports = moviesModel;