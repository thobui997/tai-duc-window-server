const userValidation = require('./user.validation');
const categoryValidation = require('./category.validation');

module.exports = {
  register: userValidation.registerSchema,
  login: userValidation.loginSchema,
  category: categoryValidation.createCategorySchema,
};
