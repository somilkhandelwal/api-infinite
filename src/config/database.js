const { Sequelize } = require('sequelize');
const { NODE_ENV } = require('../constants');
const configs = require("../database/config");


const env = NODE_ENV || "development";
const config = configs[env];
const db = config.use_env_variable
    ? new Sequelize(config.url, config)
    : new Sequelize(config.database, config.username, config.password, config);
    
module.exports = db;