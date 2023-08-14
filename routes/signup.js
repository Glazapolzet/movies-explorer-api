const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');
const router = require('express').Router();

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
    }),
  }, {
    messages: {
      'string.empty': 'Поле {#label} не может быть пустым',
      'string.min': 'Длина поля {#label} должна быть не менее {#limit} символов',
      'string.max': 'Длина поля {#label} должна быть не более {#limit} символов',
      'string.email': 'Неверный формат почты у поля {#label}',
      'any.required': 'Поле {#label} является обязательным',
    },
  }),
  createUser
);

module.exports = router;