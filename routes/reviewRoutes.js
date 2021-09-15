const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');

const { getAllReviews, getReview, createReview, deleteReview, updateReview, setListingUserIds } = reviewController;
const { protect } = authController;

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getAllReviews).post(authController.restrictTo('user'), setListingUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(authController.restrictTo('user', 'admin'), updateReview)
  .delete(authController.restrictTo('user', 'admin'), deleteReview);

module.exports = router;
