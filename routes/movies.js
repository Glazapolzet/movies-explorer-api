const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

router.get('/', getSavedMovies);
router.delete('/:movieId', deleteSavedMovie);
router.post('/', createMovie);

module.exports = router;
