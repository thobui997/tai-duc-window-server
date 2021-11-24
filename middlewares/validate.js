const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
//* Include all validators
const Validators = require('../validations');

module.exports = (validator) => {
  // eslint-disable-next-line no-prototype-builtins
  if (!Validators.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator is not exist`);
  }

  // eslint-disable-next-line consistent-return
  return async (req, res, next) => {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err.isJoi) {
        return next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, err.message));
      }
      next(
        new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error')
      );
    }
  };
};
