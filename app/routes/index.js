const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
const trackerController = require('../controllers/tracker.controller')
const deviceController = require('../controllers/device.controller')

router
    .get('/', async (ctx, next) => {
        const routes = [];
        router.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))
        ctx.body = routes;
        return next;
    })
    .get('/locations', trackerController.locations)
    .post('/locations', trackerController.addLocation)
    .get('/devices/status', deviceController.status)
    .get('/devices', deviceController.devices)

module.exports = {
    router,
};
