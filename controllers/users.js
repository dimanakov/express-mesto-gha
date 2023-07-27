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

function getUserProfile(req, res) {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.send(err));
}

module.exports.getUserById = (req, res) => {
  if (req.params.userId === 'me') {
    getUserProfile(req, res);
    return;
  }
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь по указанному _id не найден.' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
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
    { new: true },
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
