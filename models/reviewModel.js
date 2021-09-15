const mongoose = require('mongoose');
const Listing = require('./listingsModels');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty']
    },

    rating: {
      type: Number,
      min: 1,
      max: 5
    },

    createdAt: {
      type: Date,
      default: Date.now()
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Only user can review it']
    },

    listing: {
      type: mongoose.Schema.ObjectId,
      ref: 'Listing'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.index({ listing: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'user',
  //     select: 'firstName lastName'
  //   }).populate({
  //     path: 'listing',
  //     select: 'address'
  //   });

  this.populate({
    path: 'user',
    select: 'firstName lastName'
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (listingId) {
  const stats = await this.aggregate([
    {
      $match: { listing: listingId }
    },
    {
      $group: {
        _id: '$listing',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  // console.log(stats);

  if (stats.length > 0) {
    await Listing.findByIdAndUpdate(listingId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Listing.findByIdAndUpdate(listingId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.post('save', function () {
  //this pionts to current review

  this.constructor.calcAverageRatings(this.listing);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  // console.log(r);
  next();
});

reviewSchema.pre(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.listing);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
