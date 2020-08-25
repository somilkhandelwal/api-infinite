const bcrypt = require("bcryptjs");

const SALT_HASH_KEY = 11;

const hashPassword = password => bcrypt.hash(password, SALT_HASH_KEY);

const comparePassord = (password, dbPassword) =>
  bcrypt.compare(password, dbPassword);

const isPasswordChanged = (jwtExpiresTime, passwordChangedAt) =>
  passwordChangedAt > jwtExpiresTime;

exports.hashPassword = hashPassword;
exports.comparePassord = comparePassord;
exports.isPasswordChanged = isPasswordChanged;