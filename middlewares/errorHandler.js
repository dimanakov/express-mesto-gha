const mongoose = require('mongoose');
const BAD_REQUEST_400 = require('../errors/BAD_REQUEST_400');

const badRequest = new BAD_REQUEST_400('Переданы некорректные данные.');

// eslint-disable-next-line
module.exports.errorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError) {
    res.status(badRequest.statusCode).send({ message: badRequest.message });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(badRequest.statusCode).send({ message: badRequest.message });
    return;
  }
  // console.log(err);
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};
