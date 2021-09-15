const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const listingRouter = require('./routes/listingRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

app.set('view engine', 'jsx');
// app.set('views', path.join(__dirname, 'views'));

//1- GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

//Production logging

app.use(morgan('dev'));

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, try again in an hour'
});

app.use('/api', limiter);

//Body parser, reading data from body into req.body
// app.use(express.json({ limit: '10kb ' }));

//Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data Sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['typeOfResidence']
  })
);

app.use(express.json());

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/listings', listingRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend/build')));
  // console.log(path.join(__dirname, 'frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend', 'build', 'index.html'));
  });

  // console.log(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
} else {
  app.get('/', (req, res) => {
    res.send('API RUNNING!');
  });
}

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
