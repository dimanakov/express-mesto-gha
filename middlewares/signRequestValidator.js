const { Joi, celebrate } = require('celebrate');

module.exports.signRequestValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().max(63).email(),
    password: Joi.string().min(4).max(63),
  }).unknown(true),
});
