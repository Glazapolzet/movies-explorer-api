const { celebrate, Joi } = require('celebrate');
const { createUser } = require("../controllers/users");
const router = require('express').Router();

router.post('/', createUser);

module.exports = router;