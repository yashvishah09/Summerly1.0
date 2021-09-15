const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, ' First Name is required']
    },

    lastName: {
      type: String,
      required: [true, ' Last Name is required']
    },

    email: {
      type: String,
      required: [true, ' Email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    role: {
      type: String,
      enum: ['user', 'lister', 'admin'],
      default: 'user'
    },

    password: {
      type: String,
      required: [true, ' Password is required'],
      minlength: 8
    },

    confirmPassword: {
      type: String,
      required: [true, ' Re-write password!']
      // validate: {
      //   // This only works on .create() or .save()
      //   validator: function (el) {
      //     return el === this.password;
      //   },
      //   message: 'Passwords are not the same'
      // }
    },

    photo: {
      type: String,
      default: 'https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-260nw-1677509740.jpg'
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.virtual('listings', {
  ref: 'Listing',
  foreignField: 'lister',
  localField: '_id'
});

// this pre hook is typically between recieved a data and the moment where actually the data is persisted to databade.
//So in simple words between getting the data and saving the data.
userSchema.pre('save', async function (next) {
  //Only run this function if password is not modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimeStamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
