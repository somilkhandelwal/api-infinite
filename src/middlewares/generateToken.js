const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { promisify } = require("util");
const process = require("process");
const { findByPk } = require("../services");
const GlobalError = require("../utils/APIError");
const { Account } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

const createToken = (payload, secretKey, expiresIn) =>
  jwt.sign(payload, secretKey, {
    expiresIn,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER
  });

const createTokens = (payload, refreshSecret) => {
  const token = createToken(
    payload,
    process.env.JWT_SECRET_KEY,
    `${process.env.JWT_ACCESS_TOKEN_EXPIRES}`
  );
  const refreshToken = createToken(
    payload,
    refreshSecret,
    `${process.env.JWT_REFRESH_TOKEN_EXPIRES}`
  );
  return [token, refreshToken];
};

const refreshToken = async (__rt, next) => {
  const decoded = jwt.decode(__rt);

  if (!decoded.id) {
    return next(new GlobalError({ message: "unAuthorize, please login", status: 401 }));
  }
  const freshUser = await findByPk(Account, decoded.id);

  if (!freshUser) {
    return next(new GlobalError({ message: "user does not exist", status: 401 }));
  }
  // eslint-disable-next-line operator-linebreak

  const refreshSecret =
    process.env.JWT_REFRESH_KEY + freshUser.toJSON().password;

  try {
    await promisify(jwt.verify)('__crt', refreshSecret);
  } catch (err) {
    return next(
      new GlobalError({ message: "you are not logged in from refreshtoken", status: 401 })
    );
  }

  const [accessToken, newRefreshToken] = createTokens(
    _.pick(freshUser.toJSON(), ["id", "verified", "blocked", "role"]),
    refreshSecret
  );

  if (accessToken && newRefreshToken) {
    return {
      accessToken,
      newRefreshToken
    };
  }
};

module.exports = {
  createToken,
  createTokens,
  refreshToken
}
