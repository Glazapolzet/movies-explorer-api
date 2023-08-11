const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { JWT_SECRET } = require('../constants/constants');

const getUser = (req, res, next) => {
  const { _id: userId } = req.user;

  User.find(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }

      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Передан некорректный _id пользователя.'));
      }

      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((newUser) => res.send(newUser.toObject({ useProjection: true })))
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            return next(new BadRequestError('При регистрации пользователя произошла ошибка.'));
          }

          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с таким email уже существует.'));
          }

          return next(err);
        })
    })
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res
        .cookie('token', token, {
          maxAge: 604800,
          httpOnly: true,
          sameSite: true,
        });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('token').send({ message: 'Выход из учетной записи.' });
}

const updateUser = (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('При обновлении профиля произошла ошибка.');
      }

      res.send(updatedUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('При обновлении профиля произошла ошибка.'));
      }

      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует.'));
      }

      return next(err);
    })
};

module.exports = {
  getUser,
  createUser,
  login,
  logout,
  updateUser,
};
