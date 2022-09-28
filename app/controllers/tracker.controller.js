const tracker = require('../services/tracker.service')

module.exports = {
    locations: async (ctx, next) => {
        ctx.body = await tracker.getLastLocation(ctx)
        ctx.status = 200;
        return next();
    },
    addLocation: async (ctx, next) => {
        await tracker.addLocation({id: ctx.user.id, ...ctx.request.body})
        ctx.body = "success"
        ctx.status = 200;
        return next();
    },
}
