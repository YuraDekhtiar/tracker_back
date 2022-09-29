const Joi = require("joi");
const schemes = {}

schemes.login = require('./login.validations')(Joi)
schemes.loginDevice = require('./login_device.validations')(Joi)
schemes.token = require('./token.validations')(Joi)
schemes.location = require('./location.validations')(Joi)
schemes.createNewUser = require('./create_new_user.validations')(Joi)
schemes.id = require('./id.validations')(Joi)
schemes.changePassword = require('./change_password.validations')(Joi)

module.exports = schemes;

