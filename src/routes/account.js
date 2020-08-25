const account = require('express').Router();
const lodash = require('lodash')
const catchAsync = require('../helper/catchAsync');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');
const db = require('../models/index');


account.get('/', catchAsync(async (req, res) => {
    const account = { ...req.user }
    res.send(lodash.omit(account, ["password", "changedPassword"]));
}));


account.patch('/', catchAsync(async (req, res) => {
    const { Account } = db
    const result = await Account.update({
        ...req.body,
    }, {
        returning: true, where: { id: +req.user.id }
    });
    if (!result[0]) {
        throw new APIError({
            message: httpStatus["404_MESSAGE"],
            status: httpStatus.NOT_FOUND
        })
    }
    res.send(result[1]);
}));


module.exports = account;
