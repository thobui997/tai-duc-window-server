require('dotenv').config();
const Joi = require('joi');

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(5000),
    DB_DATABASE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DIALECT: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRE: Joi.string().required(),
    JWT_COOKIE_EXPIRE: Joi.number().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  database: envVars.DB_DATABASE,
  host: envVars.DB_HOST,
  dbUsername: envVars.DB_USERNAME,
  dbPassword: envVars.DB_PASSWORD,
  dbDialect: envVars.DB_DIALECT,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpire: envVars.JWT_EXPIRE,
  jwtCookieExpire: envVars.JWT_COOKIE_EXPIRE,
};
