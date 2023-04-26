const Router = require('koa-router');
const auth = require('../middlewares/auth.middleware');

const publicRouter = new Router().prefix("/api");
const privateRouter = new Router().use(auth).prefix("/api");

const authRouter = require('./auth.router');
const authDeviceRouter = require('./auth_device.router');
const locationRouter = require('./location.router');
const deviceRouter = require('./device.router')
const userRouter = require('./user.router')
const groupRouter = require('./group.router')

privateRouter
    .use(locationRouter)
    .use(deviceRouter)
    .use(userRouter)
    .use(groupRouter)

publicRouter
    .get('/', async (ctx, next) => {
        const routes = [];
        publicRouter.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))
        privateRouter.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))
        ctx.body = routes;
        ctx.status = 200;
        return next;
    })
    .use(authRouter)
    .use(authDeviceRouter);

module.exports = {
    publicRouter,
    privateRouter
};
