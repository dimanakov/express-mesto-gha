// const BAD_REQUEST_400 = require('../errors/BAD_REQUEST_400');
const NOT_FOUND_404 = require('../errors/NOT_FOUND_404');

// const { ERROR_CODE, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER } = require('../utils/errors');

const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create(
    { name, link, owner: req.user._id },
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.ValidationError) {
  //     next(new BAD_REQUEST_400('Переданы некорректные данные.'));
  //     // res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
  //     return;
  //   }
  //   res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
  // });
};

module.exports.removeCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NOT_FOUND_404('Карточка не найдена.'));
        // res.status(ERROR_NOT_FOUND).send({ message: ' Карточка не найдена.' });
        return;
      }
      res.send(card);
    })
    .catch(next);
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.CastError) {
  //     res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
  //     return;
  //   }
  //   res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
  // });
};

module.exports.setLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        // res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена.' });
        next(new NOT_FOUND_404('Карточка не найдена.'));
        return;
      }
      res.send(card.likes);
    })
    .catch(next);
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.CastError) {
  //     res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
  //     return;
  //   }
  //   res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
  // });
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        // res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена.' });
        next(new NOT_FOUND_404('Карточка не найдена.'));
        return;
      }
      res.send(card.likes);
    })
    .catch(next);
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.CastError) {
  //     res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
  //     return;
  //   }
  //   res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка.' });
  // });
};
