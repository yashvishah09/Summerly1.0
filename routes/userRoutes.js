const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  userCheck,
  uploadUserPhoto,
  resizeUserPhoto,
  getUserListing
} = userController;

const { signup, login, protect, forgotPassword, resetPassword, updatePassword } = authController;

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.route('/').get(getAllUsers);
router.route('/:id').patch(updateUser);

router.use(protect);

router.patch('/updateMyPassword', updatePassword);

router.get('/auth', userCheck);

router.get('/me', getMe, getUser);
router.get('/userListing', getUserListing);
router.put('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

// router.use(authController.restrictTo('admin'));

router.route('/').post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
