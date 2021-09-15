const Review = require('./../models/reviewModel');
const factory = require('./../controller/handlerFactory');

// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');

exports.setListingUserIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.listing) req.body.listing = req.params.listingId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
