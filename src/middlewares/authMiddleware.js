// eslint-disable-next-line no-unused-vars
const _ = require("lodash");
const Model = require("../models");

const GlobalError = require("../utils/APIError");

const { findUser } = require("../services/index");
const { comparePassord } = require("../helper/passwordOp");

const { Account } = Model;

const signinAuth = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new GlobalError({ "message": "Invalid credential", "status": 400 }));
  }

  const user = await findUser(Account, email);

  if (!user) {
    return next(new GlobalError({ "message": "Invalid credential", "status": 400 }));
  }

  if (!(await comparePassord(password, user.password))) {
    return next(new GlobalError({ "message": "Invalid credential", "status": 400 }));
  }

  if (user && user.toJSON().blocked) {
    return next(
      new GlobalError({
        "message":
          "Account is blocked, please contact the system administrator",
        "status": 401
      })
    );
  }

  req.user = user.toJSON();
  next();
};
module.exports = {
  signinAuth
};
