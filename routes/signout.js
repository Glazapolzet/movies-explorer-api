const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

router.post('/', logout);

module.exports = router;
