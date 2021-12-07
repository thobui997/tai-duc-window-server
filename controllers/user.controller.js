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

  res.status(httpStatus.OK).json({ token });
});

/**
 * @desc Get current user is logged in
 * @route GET /api/v1/auth/me
 * @access Private
 */
const getCurrentUserLogged = asyncHandler(async (req, res) => {
  const user = await userService.getCurrentUserLogged(req.user.id);
  res.status(httpStatus.OK).json({ user });
});

module.exports = {
  createUser,
  loginUser,
  getCurrentUserLogged,
};
