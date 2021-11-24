const userValidation = require('./user.validation');

module.exports = {
  register: userValidation.registerSchema,
  login: userValidation.loginSchema,
};
