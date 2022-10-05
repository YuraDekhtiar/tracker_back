const tracker = require('../services/tracker.service')

module.exports = {
    locations: async (ctx, next) => {
        ctx.body = await tracker.getLastLocation(ctx)
        ctx.status = 200;

        return next();
    },
    addLocation: async (ctx, next) => {
        const data = {id: ctx.user.id, ...ctx.request.body};
        const res = await tracker.addLocation(data)

        ctx.body = res.length
        ctx.status = 200;

        return next();
    },
}
