const router = require('express').Router();
const {
  getUser, getUsers, patchUser, patchUsersAvatar, getSelf,
} = require('../controllers/users');
const { searchValidation, patchUserValidation } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getSelf);
router.get('/:id', searchValidation, getUser);

router.patch('/me', patchUserValidation, patchUser);
router.patch('/me/avatar', patchUserValidation, patchUsersAvatar);

module.exports = router;
