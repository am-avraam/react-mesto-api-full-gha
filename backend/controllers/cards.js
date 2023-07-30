const Card = require('../models/card');
const { customErrors } = require('../constants');
const { methodCodes } = require('../constants');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(methodCodes.ResourceCreated).send({ data: card }))
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  Card.findById(id)
    .then((card) => {
      if (!card) return next(new customErrors.NotFound('Карточка не найдена'));

      if (card?.owner._id.toString() === _id) {
        return Card.findByIdAndRemove(id)
          .then((deletedCard) => (deletedCard
            ? res.send({ data: deletedCard })
            : next(new customErrors.NotFound())))
          .catch(next);
      }

      throw new customErrors.ForbiddenError('Недостаточно прав');
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => (card ? res.send({ data: card }) : next(new customErrors.NotFound())))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )

    .then((card) => (card ? res.send({ data: card }) : next(new customErrors.NotFound())))
    .catch(next);
};
