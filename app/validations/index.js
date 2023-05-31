const Joi = require("joi");
const schemes = {}

schemes.login = require('./login.validation')(Joi)
schemes.loginDevice = require('./login_device.validation')(Joi)
schemes.token = require('./token.validation')(Joi)
schemes.location = require('./location.validation')(Joi)
schemes.createNewUser = require('./create_new_user.validation')(Joi)
schemes.id = require('./ids.validation').id(Joi)
schemes.userIdGroupId = require('./ids.validation').userIdGroupId(Joi)
schemes.deviceIdGroupId = require('./ids.validation').deviceIdGroupId(Joi)
schemes.changePassword = require('./change_password.validation')(Joi)
schemes.device = require('./device.validation')(Joi)
schemes.deviceEdit = require('./device_edit.validation')(Joi)
schemes.createGroup = require('./create_new_group.validation')(Joi)
schemes.editGroup = require('./edit_group.validation')(Joi)

module.exports = schemes;

