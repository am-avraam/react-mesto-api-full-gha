const jwt = require('jsonwebtoken');
const { customErrors } = require('../constants');
const { JWT_SECRET } = require('../config');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new customErrors.AuthError('Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new customErrors.AuthError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
