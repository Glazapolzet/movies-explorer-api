const { INTERNAL_SERVER_ERROR_STATUS_CODE } = require('../constants/constants');

const defaultErrorHandler = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_STATUS_CODE, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR_STATUS_CODE
        ? 'Возникла проблема с сервером'
        : message,
    });

  next();
};

module.exports = {
  defaultErrorHandler,
};
