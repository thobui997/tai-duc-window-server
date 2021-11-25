const httpStatus = require('http-status');
const db = require('../models/index');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await db.User.findOne({ where: { email: userBody.email } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  return await db.User.create(userBody);
};

/**
 * Login user
 * @param {object} userBody
 * @returns {Promise<User>}
 */
const loginUser = async (userBody) => {
  const user = await db.User.findOne({ where: { email: userBody.email } });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is not existed');
  }
  const isMatchPassword = await user.matchPassword(userBody.password);
  if (!isMatchPassword) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Email or Password is not correct'
    );
  }

  return user;
};

/**
 * Get current logged in user
 * @param {string} userId
 * @returns {Promise<User>}
 */
const getCurrentUserLogged = async (userId) => {
  const user = await db.User.findByPk(userId);
  return user;
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUserLogged,
};
