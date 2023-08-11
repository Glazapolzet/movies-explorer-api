const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

router.post('/', login);

module.exports = router;
