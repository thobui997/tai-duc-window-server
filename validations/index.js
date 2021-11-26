const userValidation = require('./user.validation');
const categoryValidation = require('./category.validation');
const productValidation = require('./product.validation');

module.exports = {
  register: userValidation.registerSchema,
  login: userValidation.loginSchema,
  category: categoryValidation.createCategorySchema,
  product: productValidation.createProductSchema,
};
