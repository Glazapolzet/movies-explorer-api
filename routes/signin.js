const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');
const router = require('express').Router();

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }, {
    messages: {
      'string.empty': 'Поле {#label} не может быть пустым',
      'string.email': 'Неверный формат почты у поля {#label}',
      'any.required': 'Поле {#label} является обязательным',
    },
  }),
  login
);

module.exports = router;
