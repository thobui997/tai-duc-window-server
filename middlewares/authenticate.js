const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const asyncHandler = require('./async');
const ApiError = require('../utils/ApiError');
const db = require('../models/index');
const config = require('../config/config');

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new ApiError(
        httpStatus.UNAUTHORIZED,
        'Not authorize to access this route'
      )
    );
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await db.User.findByPk(decoded.id);
    next();
  } catch (error) {
    return next(
      new ApiError(
        httpStatus.UNAUTHORIZED,
        'Not authorize to access this route'
      )
    );
  }
});
module.exports = authenticate;
