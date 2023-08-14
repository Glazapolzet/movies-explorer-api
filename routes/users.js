const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
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
  updateUser,
);

module.exports = router;
