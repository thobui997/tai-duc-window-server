const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const compression = require('compression');
const config = require('./config/config');
const morgan = require('./config/morgan');
const logger = require('./config/logger');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const database = require('./config/database');

const app = express();

// Compress all HTTP response
app.use(compression({ level: 6 }));

// connect database
database.connectDB();

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

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server started on port: ${config.port}`);
});
