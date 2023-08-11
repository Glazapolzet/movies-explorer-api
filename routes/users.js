const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require("../controllers/users");
const router = require('express').Router();

router.get('/me', getUser);
router.patch('/me', updateUser);

module.exports = router;
