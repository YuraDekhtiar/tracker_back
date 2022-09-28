const Joi = require("joi");
const {DataTypes} = require("sequelize");
const schemes = {}


schemes.login = require('./login.validations')(Joi)

module.exports = schemes;

