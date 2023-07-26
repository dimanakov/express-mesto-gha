const mongoose = require('mongoose');
const validator = require('validator'); //  валидатор для данных БД

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Переданы некорректные данные при обновлении профиля.'],
    maxlength: [30, 'Переданы некорректные данные при обновлении профиля.'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Переданы некорректные данные при обновлении профиля.'],
    maxlength: [30, 'Переданы некорректные данные при обновлении профиля.'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isUrl(v),
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
