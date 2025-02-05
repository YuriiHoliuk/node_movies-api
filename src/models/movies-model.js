const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const JSON_PATH = path.join(__dirname, '../../data.json');

class MoviesModel {
    constructor(jsonPath = JSON_PATH) {
        this.jsonPath = jsonPath;
    }

    async getList(res) {
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

    async getTitles(year) {
        const movies = await this.getList();

        const filteredMovies = year
            ? movies
                .filter(movie => year === movie.year)
            : movies;
        
        return filteredMovies
            .map(({ title }) => title)
            .join('\n');
    }
}

const moviesModel = new MoviesModel();

module.exports = moviesModel;