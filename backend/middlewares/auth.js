const jwt = require('jsonwebtoken');
const { customErrors } = require('backend/constants');
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new customErrors.AuthError('Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(token, 'vashe-mesto-vozle-backenda');
  } catch (err) {
    throw new customErrors.AuthError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
