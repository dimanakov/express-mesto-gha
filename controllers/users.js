const mongoose = require('mongoose');

const { ERROR_CODE, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER } = require('../utils/errors');

const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь по указанному _id не найден.' });
        return;
      }
      res.send({ data: user });
    })
    .catch(() => {
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, about } },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь по указанному _id не найден.' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь по указанному _id не найден.' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
    });
};
