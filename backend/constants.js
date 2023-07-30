// eslint-disable-next-line max-classes-per-file
module.exports.methodCodes = {
  BadRequest: 400,
  NotFound: 404,
  DefaultCode: 500,
  ResourceCreated: 201,
  ResourceAlreadyExist: 409,
};

module.exports.customErrors = {
  NotFound: class NotFoundError extends Error {
    constructor(message) {
      super(message);
      if (!message) this.message = 'Данные отсутствуют';

      this.name = 'NotFoundError';
      this.statusCode = 404;
    }
  },

  AuthError: class AuthError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthError';
      this.statusCode = 401;
    }
  },

  ForbiddenError: class ForbiddenError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ForbiddenError';
      this.statusCode = 403;
    }
  },
};
