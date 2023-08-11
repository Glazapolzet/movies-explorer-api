const { celebrate, Joi } = require('celebrate');
const { logout } = require('../controllers/users');
const router = require('express').Router();

router.post('/', logout);

module.exports = router;
