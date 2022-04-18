const Router = require('koa-router');
const router = new Router();

router
    .get('/', async (ctx, next) => {
        const routes = [];
        router.stack.forEach(item => routes.push({path:item.path, methods:item.methods.toString()}))
        ctx.body = routes;
        return next;
    })

module.exports = {
    router,
};