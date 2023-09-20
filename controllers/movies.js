const mongoose = require('mongoose');
const Movie = require('../models/movie');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  const { _id: userId } = req.user;

  User.findUserById(userId)
    .then((user) => Movie.find({ owner: user._id })
      .populate('owner')
      .then((movies) => res.send(movies)))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Передан некорректный _id пользователя.'));
      }

      return next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((newMovie) => newMovie.populate('owner'))
    .then((newMovie) => res.send(newMovie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      }

      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id: userId } = req.user;

  User.findUserById(userId)
    .then((user) => {
      Movie.findOne({ movieId, owner: user._id })
        .populate('owner')
        .then((movie) => {
          if (!movie) {
            throw new NotFoundError('Фильм с указанным _id не найден.');
          }

          if (movie.owner.id !== userId) {
            throw new ForbiddenError('Нельзя удалить чужой фильм.');
          }

          Movie.deleteOne(movie)
            .then(() => res.send(movie))
            .catch(next);
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            return next(new BadRequestError('Передан некорректный _id фильма.'));
          }

          return next(err);
        });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
