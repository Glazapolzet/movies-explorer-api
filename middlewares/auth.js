const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../constants/constants');

const auth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new UnauthorizedError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('При авторизации произошла ошибка. Переданный токен некорректен.'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
