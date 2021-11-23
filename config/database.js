const Sequelize = require('sequelize');
const logger = require('./logger');
const config = require('./config');

const sequelize = new Sequelize(
  config.database,
  config.dbUsername,
  config.dbPassword,
  {
    host: config.host,
    dialect: config.dbDialect,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
};

module.exports = { connectDB, sequelize };
