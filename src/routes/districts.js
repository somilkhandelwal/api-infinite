const districts = require('express').Router();
const catchAsync = require('../helper/catchAsync');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');


const db = require('../models/index');

districts.get('/', catchAsync(async (req, res) => {
    const districts = await db.districtDensity.findAll({});
    const states = await db.stateDensity.findAll({});

    res.send({ districts, states });
}));

districts.get('/:id', catchAsync(async (req, res) => {
    const districts = await db.districtDensity.findByPk(+req.params.id);
    if (!districts) {
        throw new APIError({
            message: httpStatus["404_MESSAGE"],
            status: httpStatus.NOT_FOUND
        })
    }
    res.send(districts).sendStatus(200);
}))



module.exports = districts;
