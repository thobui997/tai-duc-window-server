const Joi = require('joi');

const registerSchema = Joi.object({
  userName: Joi.string().lowercase().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { registerSchema, loginSchema };
