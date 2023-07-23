const mongoose = require('mongoose');

const { ERROR_CODE, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../constants/errors');

const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.ValidationError) {
        res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь по указанному _id не найден.' });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
        return;
      }
      // if (err instanceof mongoose.ValidaionError) {
      //   res.status(ERROR_NOT_FOUND).send({ message: 'Переданы некорректные данные.' });
      //   return;
      // }
      res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      if (err instanceof mongoose.ValidationError) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      if (err instanceof mongoose.ValidationError) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};
