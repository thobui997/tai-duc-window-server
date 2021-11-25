const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().lowercase().required(),
});

module.exports = { createCategorySchema };
