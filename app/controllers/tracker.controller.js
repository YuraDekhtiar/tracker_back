const tracker = require('../services/tracker.service')

module.exports = {
    locations: async (ctx, next) => {
        ctx.body = await tracker.getLastLocation(ctx)
        ctx.status = 200;
        return next();
    },
    addLocation: async (ctx, next) => {
        console.log(ctx.request.body)
        ctx.body = await tracker.addLocation(ctx.request.body)
        ctx.status = 200;
        return next();
    },
}
