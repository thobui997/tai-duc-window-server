const morgan = require('morgan');
const config = require('./config');
const logger = require('./logger');

morgan.token('message', (req, res) => {
  return res.locals.errorMessage || '';
});

const getIpFormat = () => {
  return config.env === 'production' ? ':remote-addr - ' : '';
};
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => {
    return res.statusCode >= 400;
  },
  stream: {
    write: (message) => {
      return logger.info(message.trim());
    },
  },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => {
    return res.statusCode < 400;
  },
  stream: {
    write: (message) => {
      return logger.error(message.trim());
    },
  },
});

module.exports = {
  successHandler,
  errorHandler,
};
