const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require("../controllers/movies");
const router = require('express').Router();

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
