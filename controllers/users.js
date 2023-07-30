// const mongoose = require('mongoose');
const NOT_FOUND_404 = require('../errors/NOT_FOUND_404');

// const { ERROR_CODE, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER } = require('../utils/errors');

const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NOT_FOUND_404(' Пользователь по указанному _id не найден.'));
        return;
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, about } },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NOT_FOUND_404(' Пользователь по указанному _id не найден.'));
        return;
      }
      res.send({ data: user });
    })
    .catch(next);
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.ValidationError) {
  // eslint-disable-next-line max-len
  // res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
  //     return;
  //   }
  //   res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
  // });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        // eslint-disable-next-line max-len
        // res.status(ERROR_NOT_FOUND).send({ message: ' Пользователь по указанному _id не найден.' });
        next(new NOT_FOUND_404(' Пользователь по указанному _id не найден.'));
        return;
      }
      res.send({ data: user });
    })
    .catch(next);
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.ValidationError) {
  // eslint-disable-next-line max-len
  //     res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
  //     return;
  //   }
  //   res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
  // });
};
