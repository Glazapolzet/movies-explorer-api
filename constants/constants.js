const {
  NODE_ENV, JWT_SECRET_PROD, PUBLIC_DB_HOST, PUBLIC_PORT,
} = process.env;

const PORT = NODE_ENV === 'production' ? PUBLIC_PORT : 3000;
const URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9._~:/?#\[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9._~:/?#\[\]@!$&'()*+,;=]*)$/;
const JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET_PROD : 'secret-dummy-key';
const DB_HOST = NODE_ENV === 'production' ? PUBLIC_DB_HOST : 'mongodb://localhost:27017/moviesexplorerdb';

const BAD_REQUEST_STATUS_CODE = 400;
const UNAUTHORIZED_STATUS_CODE = 401;
const FORBIDDEN_STATUS_CODE = 403;
const NOT_FOUND_STATUS_CODE = 404;
const CONFLICT_STATUS_CODE = 409;
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;

const ALLOWED_ORIGINS = [
  'http://vypz.diploma.nomoreparties.co',
  'https://vypz.diploma.nomoreparties.co',
  'http://localhost:3001',
  'http://localhost:3000',
];

module.exports = {
  PORT,
  URL_REGEX,
  JWT_SECRET,
  DB_HOST,
  BAD_REQUEST_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  CONFLICT_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  ALLOWED_ORIGINS,
};
