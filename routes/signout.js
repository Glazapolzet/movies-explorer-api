const { logout } = require('../controllers/users');
const router = require('express').Router();

router.get('/', logout);

module.exports = router;
