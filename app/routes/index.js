const Router = require('koa-router');
const auth = require('../middleware/auth.middleware');
const trackerController = require("../controllers/tracker.controller");
const deviceController = require("../controllers/device.controller");
const authController = require("../controllers/auth.controller");
const publicRouter = new Router().prefix('/api');
const privateRouter = new Router().use(auth).prefix('/api');

publicRouter
    .get('/', async (ctx, next) => {
        const routes = [];
        publicRouter.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))
        privateRouter.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))
        ctx.body = routes;
        ctx.status = 200;
        return next;
    })
    .post('/auth/login', authController.login)
    .post('/auth/refresh-token', authController.refreshToken)
    .post('/auth/logout', authController.logout)
    .get('/locations', trackerController.locations)
    .post('/locations', trackerController.addLocation)
    .get('/devices/status', deviceController.status)
    .get('/devices', deviceController.devices)
    .get('/users', async (ctx, next) => {
        ctx.body = {user: 'Yura'};
        ctx.status = 200;
        return next;
    })





module.exports = {
    publicRouter,
    privateRouter
};
