const { ALLOWED_ORIGINS, ALLOWED_METHODS } = require('../utils/cors');

const corsMiddleware = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];

  if (ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
};
module.exports = corsMiddleware;
