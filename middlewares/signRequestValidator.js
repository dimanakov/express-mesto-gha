const { Joi, celebrate } = require('celebrate');
const { regexpURL } = require('../utils/constants');

module.exports.signRequestValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexpURL),
    email: Joi.string().required().max(63).email(),
    password: Joi.string().required().min(4).max(63),
  }).unknown(true),
});
