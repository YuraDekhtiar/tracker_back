const authDeviceController = require("../controllers/auth.device.controller");
const validation = require("../middlewares/validation.middleware");
const schemes = require("../validations");
const Router = require('koa-router');

const authDeviceRouter = new Router();

authDeviceRouter
    .post('/device-auth/login', validation(schemes.loginDevice), authDeviceController.login)
    .post('/device-auth/logout', validation(schemes.token), authDeviceController.logout)
    .post('/device-auth/refresh-token', validation(schemes.token), authDeviceController.refreshToken)

module.exports = authDeviceRouter.routes()
