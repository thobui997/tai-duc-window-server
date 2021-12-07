const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const compression = require('compression');
const config = require('./config/config');
const morgan = require('./config/morgan');
const logger = require('./config/logger');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const db = require('./models/index');

// routes
const userRouter = require('./routes/user.router');
const categoryRouter = require('./routes/category.router');
const productRouter = require('./routes/product.router');
const uploadImageRouter = require('./routes/upload-image.router');

const app = express();

// Compress all HTTP response
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers['x-no-compress']) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

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
app.use('/api/v1', productRouter);
app.use('/api/v1', uploadImageRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

//  connecting to server
db.sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
    app.listen(config.port, () => {
      logger.info(`Server started on port: ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
    db.sequelize.close();
    process.exit(1);
  });
