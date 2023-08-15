const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Вы ввели неправильный логин или пароль.'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Вы ввели неправильный логин или пароль.'));
          }

          return user;
        });
    });
};

userSchema.statics.findUserById = function (userId) {
  return this.findById(userId)
    .then((user) => {
      if (!user) {
        return Promise.reject(NotFoundError('Пользователь с указанным _id не найден.'));
      }

      return user;
    });
};

module.exports = mongoose.model('user', userSchema);
