const deviceService = require("../services/device.service");

module.exports = {
    devices: async (ctx, next) => {
        ctx.body = await deviceService.getDevices();
        ctx.status = 200;

        return next();
    },
    deviceById: async (ctx, next) => {
        const {id} = ctx.query
        const device = await deviceService.getDeviceById(id);

        if(device) {
            ctx.body = device;
            ctx.status = 200;
        } else {
            ctx.body = { message: 'Device not found' };
            ctx.status = 404;
        }
        return next();
    },
    updateDeviceById: async (ctx, next) => {
        const result = await deviceService.updateDeviceById(ctx);
        if(result > 0) {
            ctx.body = {
                message: "Updated"
            }
        }
        ctx.status = 200;
        next();
    },
    status: async (ctx, next) => {
        ctx.body = await deviceService.getDeviceStatus(ctx);
        ctx.status = 200;
        return next();
    },
    addDevice: async (ctx, next) => {
        const device = await deviceService.addDevice(ctx)
        ctx.body = {
            message: `Device was added`,
            device: {
                id: device.id,
            }
        }
        ctx.status = 200;

        return next();
    },
    deleteDevice: async (ctx, next) => {
        const {id} = ctx.query;

        ctx.body = await deviceService.deleteDeviceById(id);
        ctx.status = 200;

        return next();
    }
}
