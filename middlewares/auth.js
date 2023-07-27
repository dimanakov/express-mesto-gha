const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // тут будет вся авторизация
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен в блоке try
    payload = jwt.verify(token, 'soon-im-back');
  } catch (err) {
    // при неудаче верификации вернём ошибку 401
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload; // записываем верификацию в объект запроса

  next(); // пропускаем запрос дальше
};
