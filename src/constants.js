const process = require('process');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const USERNAME = process.env.USERNAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
  PORT,
  DATABASE,
  PASSWORD,
  USERNAME,
  DB_HOST,
  DB_PORT,
  NODE_ENV,
  JWT_SECRET_KEY
}