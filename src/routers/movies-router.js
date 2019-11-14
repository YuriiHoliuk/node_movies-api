const { Router } = require('express');
const moviesController = require('../controllers/movies-controller');

const router = Router();

router.get('/', moviesController.get);
router.get('/titles', moviesController.getTitles);
router.get('/:id', moviesController.getById);

module.exports = router;
