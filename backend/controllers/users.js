const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { customErrors, methodCodes } = require('../constants');
const { JWT_SECRET } = require('../config');

const updateParams = {
  new: true, // обработчик then получит на вход обновлённую запись
  runValidators: true, // данные будут валидированы перед изменением
  // upsert: true, // если пользователь не найден, он будет создан
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => {
      res.status(methodCodes.ResourceCreated).send({
        data: {
          name, about, avatar, email,
        },
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        });
      // .end();

      res.send({ token });
    })

    .catch(next);
};

module.exports.getSelf = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => (user ? res.send({ data: user }) : next(new customErrors.NotFound())))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => (user ? res.send({ data: user }) : next(new customErrors.NotFound())))
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { ...req.body }, updateParams)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.patchUsersAvatar = (req, res, next) => {
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar: req.body.avatar }, updateParams)
    .then((user) => res.send({ data: user }))
    .catch(next);
};
