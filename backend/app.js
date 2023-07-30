const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { createUser, login } = require('backend/controllers/users');
const auth = require('backend/middlewares/auth');
const { signupValidation, loginValidation } = require('backend/middlewares/validation');
const { customErrors } = require('backend/constants');
const errorHandler = require('backend/middlewares/errorHandler');
const { requestLogger, errorLogger } = require('backend/middlewares/logger');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use(requestLogger);

app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', signupValidation, createUser);

app.use(auth);

app.use('/users', require('backend/routes/users'));
app.use('/cards', require('backend/routes/cards'));

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new customErrors.NotFound('Маршрут не найден'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Ссылка на сервер: ${BASE_PATH}`);
});
