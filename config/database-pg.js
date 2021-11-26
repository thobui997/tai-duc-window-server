const config = require('./config');

module.exports = {
  development: {
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.database,
    host: config.host,
    dialect: config.dbDialect,
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
    },
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
    },
    timezone: config.dbTimeZone,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.database,
    host: config.host,
    dialect: config.dbDialect,
    port: config.dbPort,
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
    },
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
    },
    timezone: config.dbTimeZone,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  },
};
