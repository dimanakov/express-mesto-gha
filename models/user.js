const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Переданы некорректные данные при обновлении профиля.'],
    maxlength: [30, 'Переданы некорректные данные при обновлении профиля.'],
    required: true,
  },
  about: {
    type: String,
    minlength: [2, 'Переданы некорректные данные при обновлении профиля.'],
    maxlength: [30, 'Переданы некорректные данные при обновлении профиля.'],
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
