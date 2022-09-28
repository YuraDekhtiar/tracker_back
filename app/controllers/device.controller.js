const deviceService = require("../services/device.service");

module.exports = {
    devices: async (ctx, next) => {
        ctx.body = await deviceService.getDevices(ctx);
        ctx.status = 200;
        next();
    },
    status: async (ctx, next) => {
        ctx.body = await deviceService.getDeviceStatus(ctx);
        ctx.status = 200;
        next();
    }
}
