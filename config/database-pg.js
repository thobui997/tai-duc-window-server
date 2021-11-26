const config = require('./config');

module.exports = {
  development: {
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.database,
    host: config.host,
    dialect: config.dbDialect,
    timezone: config.dbTimeZone,
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
    },
  },
  production: {
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.database,
    host: config.host,
    dialect: config.dbDialect,
    port: config.dbPort,
    timezone: config.dbTimeZone,
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
    },
  },
};
