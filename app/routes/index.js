const Router = require('koa-router');
const auth = require('../middleware/auth.middleware');
const trackerController = require("../controllers/tracker.controller");
const deviceController = require("../controllers/device.controller");
const authDeviceController = require("../controllers/auth.device.controller");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller")
const publicRouter = new Router().prefix("/api");
const privateRouter = new Router().use(auth).prefix("/api");
const onlyAdmin = require('../middleware/admin.middleware');
const validation = require('../middleware/validation.middleware');
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
    .post('/auth/login', validation(schemes.login), authController.login)
    .post('/auth/refresh-token', validation(schemes.token), authController.refreshToken)
    .post('/auth/logout', validation(schemes.token), authController.logout)
    .get('/locations', trackerController.locations)
        // device routes
    .post('/device-auth/login', validation(schemes.loginDevice), authDeviceController.login)
    .post('/device-auth/logout', validation(schemes.token), authDeviceController.logout)
    .post('/device-auth/refresh-token', validation(schemes.token), authDeviceController.refreshToken)

privateRouter
    .get('/devices/status', deviceController.status)
    .get('/device/status1', async(ctx, next) => {
        ctx.body = {
                "id": 1,
                "login": 123,
                "name": null,
                "access_token": "1",
                "refresh_token": "2"

        }
        ctx.status = 200;
        next();
    })
    .get('/devices', deviceController.devices)



    .post('/device/locations', validation(schemes.location), trackerController.addLocation)

    //users
    .get('/users', onlyAdmin, userController.users)
    .post('/users/create-new-user', validation(schemes.createNewUser), onlyAdmin, userController.createNewUser)
    .delete('/users/delete', validation(schemes.deleteUser, false), onlyAdmin, userController.deleteUser)

    // profile
    .get('/profile', userController.profile)
    .put('/profile/change-pass', userController.changePassword)

module.exports = {
    publicRouter,
    privateRouter
};
