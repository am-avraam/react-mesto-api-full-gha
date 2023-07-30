const { methodCodes } = require('../constants');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(methodCodes.BadRequest).send({ message: 'Переданы некорректные данные' });
  }

  if (err.name === 'CastError') {
    return res.status(methodCodes.BadRequest).send({ message: 'Некорректный id' });
  }

  if (err.code === 11000) {
    return res.status(methodCodes.ResourceAlreadyExist).send({ message: 'Пользователь с таким email уже зарегистрирован' });
  }

  const { statusCode = 500, message } = err;

  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};
