const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

router.post('/', createUser);

module.exports = router;