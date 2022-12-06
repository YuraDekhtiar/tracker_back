const Router = require('koa-router');
const auth = require('../middlewares/auth.middleware');
const trackerController = require("../controllers/tracker.controller");
const deviceController = require("../controllers/device.controller");
const authDeviceController = require("../controllers/auth.device.controller");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller")
const publicRouter = new Router().prefix("/api");
const privateRouter = new Router().use(auth).prefix("/api");
const onlyAdmin = require('../middlewares/admin.middleware');
const validation = require('../middlewares/validation.middleware');
const schemes = require('../validations');

publicRouter
    .get('/', async (ctx, next) => {
        const routes = [];
        publicRouter.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))
        privateRouter.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))
        ctx.body = routes;
        ctx.status = 200;
        return next;
    })
        // auth
    .post('/auth/login', validation(schemes.login), authController.login)
    .post('/auth/refresh-token', validation(schemes.token), authController.refreshToken)
    .post('/auth/logout', validation(schemes.token), authController.logout)
        // device-auth
    .post('/device-auth/login', validation(schemes.loginDevice), authDeviceController.login)
    .post('/device-auth/logout', validation(schemes.token), authDeviceController.logout)
    .post('/device-auth/refresh-token', validation(schemes.token), authDeviceController.refreshToken)

privateRouter
    // test
    .get('/device/status1', async(ctx, next) => {
        ctx.body = {
                "id": 1,
                "login": 123,
                "name": null,
                "access_token": "1",
                "refresh_token": "2"

        }
        ctx.status = 200;
        return next();
    })

    // locations
    .get('/locations', validation(schemes.id, false), trackerController.locations)

        // device
    .get('/devices', deviceController.devices)
    .get('/device', onlyAdmin, validation(schemes.id, false), deviceController.deviceById)
    .post('/device/locations', validation(schemes.location), trackerController.addLocation)
    .put('/device/edit', onlyAdmin, validation(schemes.deviceEdit), deviceController.updateDeviceById)
    .post('/device/add-device', onlyAdmin, validation(schemes.device), deviceController.addDevice)
    .delete('/device/delete', onlyAdmin, validation(schemes.id, false), deviceController.deleteDevice)

        //users
    .get('/users', onlyAdmin, userController.users)
    .post('/users/create-new-user', onlyAdmin, validation(schemes.createNewUser), userController.createNewUser)
    .delete('/users/delete', onlyAdmin, validation(schemes.id, false), userController.deleteUser)

        // profile
    .get('/profile', userController.currentUser)
    .put('/profile/change-pass', validation(schemes.changePassword), userController.changePassword)

module.exports = {
    publicRouter,
    privateRouter
};
