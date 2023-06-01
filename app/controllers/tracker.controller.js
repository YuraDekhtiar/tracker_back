const trackerService = require('../services/tracker.service')

module.exports = {
    locations: async (ctx, next) => {
        ctx.body = await trackerService.getLastLocation(ctx);
        ctx.status = 200;

        return next();
    },
    addLocation: async (ctx, next) => {
        const data = {id: ctx.currentUser.id, ...ctx.request.body};
        const res = await trackerService.addLocation(data)

        ctx.body = res.length === 2 ? "success" : "error"
        ctx.status = 200;

        return next();
    },
}
