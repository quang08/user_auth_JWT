const dotenv = require('dotenv')

dotenv.config();

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_MYSQLDB,
  dialect: "mysql",
  pool: {
    max: 5, //maximum number of connection in pool
    min: 0, //minimum number of connection in pool
    acquire: 3000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 1000, //maximum time, in milliseconds, that a connection can be idle before being released
  },
};