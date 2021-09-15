const multer = require('multer');
const sharp = require('sharp');
const Listing = require('./../models/listingsModels');
const catchAsync = require('../utils/catchAsync');
const factory = require('./../controller/handlerFactory');
// const AppError = require('../utils/appError');
// const APIFeatures = require('../utils/apiFeatures');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload valid file.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadListingImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

exports.resizeListingsImages = catchAsync(async (req, res, next) => {

  
  
  if (!req.files.imageCover || !req.files.images) return next();

  //1) Cover Image
  req.body.imageCover = `listing-${req.params.id}-${Date.now()}-cover.jpeg`;
  
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`./frontend/public/uploads/${req.body.imageCover}`);

  //2) Images
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `listing-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer).resize(2000, 1333).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`./frontend/public/uploads/${filename}`);

      req.body.images.push(filename);
    })
  );
  next();
});

exports.aliasTopListings = (req, res, next) => {
  req.query.limit = '3';
  req.query.sort = '-monthlyRent';

  next();
};

exports.getAllListings = factory.getAll(Listing);
exports.getListing = factory.getOne(Listing, { path: 'reviews' });
exports.createListing = factory.createOne(Listing);
exports.updateListing = factory.updateOne(Listing);
exports.deleteListing = factory.deleteOne(Listing);

exports.getListingsStats = catchAsync(async (req, res, next) => {
  const stats = await Listing.aggregate([
    {
      $match: { typeOfResidence: 'House' }
    },
    {
      $group: {
        _id: '$utilityIncluded',
        numListings: { $sum: 1 },
        minMonthlyRent: { $min: '$monthlyRent' },
        maxMonthlyRent: { $max: '$monthlyRent' }
      }
    }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});
