const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const morgan = require('./config/morgan');
const logger = require('./config/logger');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const db = require('./models/index');

// routes
const userRouter = require('./routes/user.router');
const categoryRouter = require('./routes/category.router');

const app = express();

// Compress all HTTP response
app.use(compression({ level: 6 }));

// parse cookie
app.use(cookieParser());

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// mount router
app.use('/api/v1/auth', userRouter);
app.use('/api/v1', categoryRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

let server;
//  connecting to server
db.sequelize.authenticate().then(() => {
  logger.info('Connection has been established successfully.');
  server = app.listen(config.port, () => {
    logger.info(`Server started on port: ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
