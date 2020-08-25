const Model = require("../models");
const _ = require("lodash");
const { findOrCreate } = require("./index");
const { hashPassword } = require("../helper/passwordOp");
const catchAsync = require("../helper/catchAsync");
const { deleteCookies } = require('../helper/cookieHelper');

const { Account } = Model;

const signupService = catchAsync(async (req, res) => {
  const password = await hashPassword(req.body.password);

  const email = req.body.email.toLowerCase();

  const [account, created] = await findOrCreate(Account, {
    ...req.body,
    password,
    email
  });

  if (!created) {
    return res.status(400).json({
      status: "fail",
      message: "user already exist"
    });
  }
  return res.status(201).json({
    status: "success",
    message: "user successfully created",
    payload: _.omit(account.toJSON(), ["password", "changedPassword"])
  });
});

const signoutService = catchAsync(async (req, res) => {
  deleteCookies(req, res)
  return res.send({
    status: "success",
    message: "user successfully Logout",
  }).sendStatus(201);
})

module.exports = {
  signupService,
  signoutService
};
