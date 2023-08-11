const { UNAUTHORIZED_STATUS_CODE } = require('../constants/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_STATUS_CODE;
  }
}

module.exports = UnauthorizedError;
