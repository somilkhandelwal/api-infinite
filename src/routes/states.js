const states = require('express').Router();
const catchAsync = require('../helper/catchAsync');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');
const db = require('../models/index');



states.get('/', catchAsync(async (req, res) => {
    const states = await db.stateDensity.findAll({});
    res.send(states);
}));

states.get('/:id', catchAsync(async (req, res) => {
    const districts = await db.districtDensity.findAll({
        where: {
            stateDensity: req.params.id
        }
    });
    const state = await db.stateDensity.findByPk(+req.params.id);
    if (!state) {
        throw new APIError({
            message: httpStatus["404_MESSAGE"],
            status: httpStatus.NOT_FOUND
        })
    }
    res.send({ districts, state });
}))

module.exports = states;
