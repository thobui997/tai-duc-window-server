const Joi = require('joi');

const createProductSchema = Joi.object({
  categoryName: Joi.string().lowercase().required(),
  title: Joi.string().lowercase().required(),
  description: Joi.string().lowercase().required(),
  image: Joi.string().lowercase().required(),
  body: Joi.string().lowercase(),
});

module.exports = { createProductSchema };
