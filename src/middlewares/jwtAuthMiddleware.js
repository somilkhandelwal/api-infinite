const GlobalError = require("../utils/APIError");
const { jwtVerifyToken, refreshToken } = require("../helper/generateToken");
const { isPasswordChanged } = require("../helper/passwordOp");
const catchAsync = require("../helper/catchAsync");
const Model = require("../models");
const { findByPk } = require("../services/index");
const { createCookie } = require("../helper/cookieHelper");
const process = require('process');
const dotenv = require('dotenv');

dotenv.config();

const { Account } = Model;

const jwtProtect = catchAsync(async (req, res, next) => {
  // we are retrieving the token from the cookie, the cookie object what available to us because of the cookie middleware at src/index
  // console.log(req)
  const token = (req.cookies || {}).__act;

  if (!token) {
    return next(new GlobalError({ message: "You are not logged in", status: 401 }));
  }

  try {
    const decoded = await jwtVerifyToken(token);

    if (decoded.blocked) {
      return next(
        new GlobalError({
          message: "Your account has been blocked, contact system administrator ",
          status: 401
        })
      );
    }

    const freshUser = await findByPk(Account, decoded.id);
    if (!freshUser) {
      return next(new GlobalError({ message: "user from does not exist", status: 401 }));
    }
    const passwordChangeAt = Math.round(
      new Date(`${freshUser.toJSON().changedPassword}`).getTime() / 1000
    );

    if (isPasswordChanged(decoded.iat, passwordChangeAt)) {
      return next(
        new GlobalError({
          message: "You are not logged in, please login with correct details",
          status: 401
        })
      );
    }
    req.user = freshUser.toJSON();

    next();
  } catch (err) {
    console.log(err.stack);
    const { __rt } = req.cookies;

    const { accessToken, newRefreshToken } = await refreshToken(__rt, next);

    if (accessToken && newRefreshToken) {
      createCookie(
        res,
        accessToken,
        "__act",
        process.env.ACCESS_TOKEN_COOKIE_EXPIRES
      );
      createCookie(
        res,
        newRefreshToken,
        "__rt",
        process.env.REFRESH_TOKEN_COOKIE_EXPIRES
      );

      next();
    }
  }
});

module.exports = {
  jwtProtect
}