const Joi = require("joi");
const {DataTypes} = require("sequelize");
const schemes = {}


schemes.login = require('./login.validations')(Joi)
schemes.loginDevice = require('./login_device.validations')(Joi)
schemes.token = require('./token.validations')(Joi)

module.exports = schemes;

