const { NOT_FOUND_STATUS_CODE } = require('../constants/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS_CODE;
  }
}

module.exports = NotFoundError;
