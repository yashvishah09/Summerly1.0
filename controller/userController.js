const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./../controller/handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './frontend/public/uploads');
//   },
//   filename: (req, file, cb) => {
//     //user-userId(7676769p8)-currentTimeStamp(343422).jpeg
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });

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

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`./frontend/public/uploads/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!Use signup instead'
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1- Create error if user posts any password related data
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError("You can't update password through this route", 400));
  }

  //2- Update user document as per data
  const filterBody = filterObj(req.body, 'firstName', 'email', 'lastName', 'role');
  if (req.file) filterBody.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.userCheck = catchAsync(async (req, res, next) => {
  if (req.user) {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } else {
    console.log('Error');
    return next(new AppError('Server Error', 500));
  }

  next();
});

exports.getUserListing = catchAsync(async (req, res, next) => {
  let query = User.findById(req.user.id);
  query = query.populate({ path: 'listings' });

  const doc = await query;

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc
    }
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User, { path: 'listings' });
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
