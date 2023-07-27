// создаём роутер express router
const router = require('express').Router();

const {
  getUsers, getUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
// router.get('/me', getUserProfile);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
