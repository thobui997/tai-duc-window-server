const config = require('./config');

module.exports = {
  development: {
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.database,
    host: config.host,
    dialect: config.dbDialect,
  },
  production: {
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.database,
    host: config.host,
    dialect: config.dbDialect,
    port: config.dbPort,
  },
};
