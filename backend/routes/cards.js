const router = require('express').Router();
const {
  createCard, deleteCard, getCards, likeCard, dislikeCard,
} = require('backend/controllers/cards');
const { createCardValidation, idCardValidation, idCardValidationLike } = require('backend/middlewares/validation');

router.get('/', getCards);
router.delete('/:id', idCardValidation, deleteCard);
router.post('/', createCardValidation, createCard);

router.put('/:cardId/likes', idCardValidationLike, likeCard);
router.delete('/:cardId/likes', idCardValidationLike, dislikeCard);

module.exports = router;
