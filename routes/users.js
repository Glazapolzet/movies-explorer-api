const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

router.get('/me', getUser);
router.patch('/me', updateUser);

module.exports = router;
