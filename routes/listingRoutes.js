const express = require('express');
const listingsController = require('./../controller/listingsController');
const authController = require('../controller/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  aliasTopListings,
  getListingsStats,
  uploadListingImages,
  resizeListingsImages
} = listingsController;
const { protect } = authController;

const router = express.Router();

// POST /tour/23456/reviews
// router.route('/:listingId/reviews').post(protect, authController.restrictTo('user'), createReview);

router.use('/:listingId/reviews', reviewRouter);

router.route('/top-3-listings').get(aliasTopListings, protect, authController.restrictTo('admin', 'lister'), getAllListings);

router.route('/listing-stats').get(getListingsStats);

router.route('/').get(getAllListings).post(protect, authController.restrictTo('lister'), uploadListingImages, resizeListingsImages, createListing);

router
  .route('/:id')
  .get(getListing)
  .put(protect, authController.restrictTo('admin', 'lister'), uploadListingImages, resizeListingsImages, updateListing)
  .delete(protect, authController.restrictTo('admin', 'lister'), deleteListing);

module.exports = router;
