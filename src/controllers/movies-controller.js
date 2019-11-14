const moviesModel = require('../models/movies-model');
const { handleApiError, handleModelError } = require('../utils/error-handlers');

module.exports = {
  get(req, res) {
    moviesModel.getList()
      .catch(handleModelError)
      .then(movies => res.send(movies))
      .catch(handleApiError(res));
  },
  getById(req, res) {
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
  },
  getTitles(req, res) {
    moviesModel.getTitles(req.query.year)
        .catch(handleModelError)
        .then(titles => res.send(titles))
        .catch(handleApiError(res));
  }
};
