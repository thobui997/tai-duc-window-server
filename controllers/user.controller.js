const httpStatus = require('http-status');
const asyncHandler = require('../middlewares/async');
const userService = require('../services/user.service');
const config = require('../config/config');

/**
 * @desc Register a user
 * @route POST /api/v1/auth/register
 * @access Public
 */
const createUser = asyncHandler(async (req, res) => {
  await userService.createUser(req.body);

  res.status(httpStatus.CREATED).json({});
});

/**
 * @desc Login user
 * @route POST /api/v1/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const user = await userService.loginUser(req.body);

  // create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + config.jwtCookieExpire * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (config.env === 'production') {
    options.secure = true;
  }

  res.status(httpStatus.OK).cookie('token', token, options).json({ token });
});

module.exports = {
  createUser,
  loginUser,
};
