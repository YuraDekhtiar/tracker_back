const Joi = require("joi");
const schemes = {}


schemes.login = require('./login.validations')(Joi)
schemes.loginDevice = require('./login_device.validations')(Joi)
schemes.token = require('./token.validations')(Joi)
schemes.location = require('./location.validations')(Joi)

module.exports = schemes;

