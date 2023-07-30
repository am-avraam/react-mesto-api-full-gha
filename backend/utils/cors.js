const ALLOWED_ORIGINS = [
  'https://amavraam.nomoredomains.sbs',
  'http://amavraam.nomoredomains.sbs',
  'http://localhost:3000',
];
// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { ALLOWED_ORIGINS, ALLOWED_METHODS };
