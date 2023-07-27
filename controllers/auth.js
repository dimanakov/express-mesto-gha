const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ERROR_CODE, ERROR_INTERNAL_SERVER } = require('../utils/errors');

const User = require('../models/user');

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 7)
    .then((hash) => {
      const {
        name, about, avatar, email,
      } = req.body;
      User.create({
        name, about, avatar, email, password: hash,
      }); // записываем хеш в базу
    })
    .then((user) => res.status(201).send({
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
        return;
      }
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ token: jwt.sign({ _id: user._id }, 'soon-im-back', { expiresIn: '7d' }) });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
