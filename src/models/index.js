/* eslint-disable no-undef */
'use strict';
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const fs = require('fs');
const path = require('path');
const { generateOutput } = require('../helper/csvHelper');
const { hashPassword } = require('../helper/passwordOp');
const basename = path.basename(__filename);
const { JWT_SECRET_KEY } = require('../constants')

const db = {};


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    sequelize[model.name] = model;
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

/**
 * 
 * Syncing db with models
 * clearning db when starting app
 * Creating bulk entry of state and districts
 * Creating default login account
 */


db.sequelize.sync({
  force: true,
  logging: console.log
}).then(() => {
  console.log('Table Created Successfully')
}).then(() => {
  return new Promise((res) => {
    res(generateOutput('india-districts-census-20111.xlsx'));
  })
}).then(chc => {
  db.stateDensity.bulkCreate([...Object.keys(chc.states).map((item) => chc.states[item])]);
  return chc;
}).then((chc) => {
  db.districtDensity.bulkCreate([...Object.keys(chc.districts).map((item) => chc.districts[item])]);
})
  .then(() => {
    return new Promise((res) => {
      res(hashPassword(JWT_SECRET_KEY));
    });
  }).then((res) => {
    db.Account.create({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin',
      password: res
    })
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;