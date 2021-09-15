const mongoose = require('mongoose');

const listingsSchema = new mongoose.Schema(
  {
    typeOfResidence: {
      type: String,
      required: [true, 'You should the type of residence']
    },
    title: {
      type: String
    },
    street: {
      type: String,
      required: [true]
    },
    zipCode: {
      type: String,
      required: [true]
    },
    city: {
      type: String,
      required: [true]
    },
    state: {
      type: String,
      required: [true]
    },
    moveInDate: {
      type: Date,
      required: [true, 'Move in date needs to be specified']
    },
    monthlyRent: {
      type: Number,
      required: [true]
    },
    utilityIncluded: {
      type: String,
      required: [true]
    },

    imageCover: {
      type: String
    },

    images: [String],
    roommates: {
      type: String,
      required: [true]
    },

    laundry: {
      type: String,
      required: [true]
    },
    reservedParking: {
      type: String
    },
    isFurnished: {
      type: String,
      required: [true]
    },

    genderPreference: {
      type: String,
      required: [true]
    },
    listingDescription: {
      type: String
    },

    postedAt: {
      type: Date,
      default: Date.now()
    },
    ratingsAverage: {
      type: Number,
      default: 4,
      min: [1],
      max: [5],
      set: (val) => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    location: {
      //GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },

    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
      }
    ],
    lister: { type: mongoose.Schema.ObjectId, ref: 'User' }
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

listingsSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'listing',
  localField: '_id'
});

listingsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'lister',
    select: '-__v -passwordChangedAt'
  });

  next();
});

const Listing = mongoose.model('Listing', listingsSchema);

module.exports = Listing;
