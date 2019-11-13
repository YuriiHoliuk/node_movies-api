const express = require('express');
const fs = require('fs');
const moviesModel = require('./models/movies-model');

const server = express();
const port = process.env.PORT || 4000;

function handleApiError(res) {
  return (apiError) => {
    res.status(apiError.statusCode).json(apiError);
  };
}

function handleModelError(err) {
  const apiError = {
    statusCode: 500,
    errorMessage: err.message,
  };

  throw apiError;
}

server.get(`/movies`, (req, res) => { // Controller
  moviesModel.getList()
    .catch(handleModelError)
    .then(movies => res.send(movies))
    .catch(handleApiError(res));
});

server.get('/movies/titles', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if(err) {
      res.sendStatus(500);
    } else {
      let films = JSON.parse(data);

      if (req.query.year) {
        films = films.filter(film => film.year === req.query.year);
      }

      if (!films.length) {
        res.status(404).send("Title not found");
      } else {
        res.send(films
          .map(movie => movie.title)
          .sort()
          .join('\n')
        );
      }
    }
  })
});

server.get('/movies/:id', (req, res) => {
  moviesModel.getMovieById(req.params.id)
    .catch(handleModelError)
    .then(movie => {
      if (!movie) {
        const apiError = {
          statusCode: 404,
          errorMessage: 'Not Found',
        };

        throw apiError;
      }
      
      res.send(movie);
    })
    .catch(handleApiError(res));
});

server.listen(port, () => console.log(`Listening on port ${port}`))
