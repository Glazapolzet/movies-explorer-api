const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { URL_REGEX } = require('../constants/constants');
const router = require('express').Router();

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(URL_REGEX, 'url'),
      trailerLink: Joi.string().required().pattern(URL_REGEX, 'url'),
      thumbnail: Joi.string().required().pattern(URL_REGEX, 'url'),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }, {
    messages: {
      'string.empty': 'Поле {#label} не может быть пустым',
      'string.pattern.name': 'Формат ссылки поля {#label} не соответствует шаблону {#name}',
      'any.required': 'Поле {#label} является обязательным',
    },
  }),
  createMovie,
);
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24).required(),
    }),
  }, {
    messages: {
      'string.hex': 'Параметр {#label} должен состоять из латинских букв или цифр',
      'string.length': 'Параметр {#label} должен иметь длину {#limit} символов',
      'any.required': 'Поле {#label} является обязательным',
    },
  }),
  deleteMovie
);

module.exports = router;
