const { Joi, celebrate } = require('celebrate');

const linkPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const emailPattern = /\w+@\w+\.\w+/;

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkPattern),
    email: Joi.string().required().email().pattern(emailPattern),
    password: Joi.string().required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().pattern(emailPattern),
    password: Joi.string().required(),
  }),
});

const searchValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const patchUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().pattern(emailPattern),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkPattern),

  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    link: Joi.string().pattern(linkPattern).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const idCardValidation = celebrate({
  params: {
    id: Joi.string().length(24).hex().required(),
  },
});

const idCardValidationLike = celebrate({
  params: {
    cardId: Joi.string().length(24).hex().required(),
  },
});

module.exports = {
  signupValidation,
  loginValidation,
  searchValidation,
  patchUserValidation,
  createCardValidation,
  idCardValidation,
  idCardValidationLike,
};
