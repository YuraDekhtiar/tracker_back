const deviceService = require("../services/device.service");

module.exports = {
    devices: async (ctx, next) => {
        ctx.body = await deviceService.getDevices();
        ctx.status = 200;

        return next();
    },
    deviceById: async (ctx, next) => {
        const { id } = ctx.query;
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
        const {id, login, name, password} = ctx.request.body
        const result = await deviceService.updateDeviceById(id, login, name, password);
        if(result[0] > 0) {
            ctx.body = {
                message: "Updated"
            }
        }
        ctx.status = 200;
        return next();
    },
    status: async (ctx, next) => {
        ctx.body = await deviceService.getDeviceStatus(ctx);
        ctx.status = 200;
        return next();
    },
    addDevice: async (ctx, next) => {
        const {login, name, password} = ctx.request.body;
        const device = await deviceService.addDevice(login, name, password)

        if(!device) {
            ctx.body = {
                message: "The login is already in use"
            }
            ctx.status = 409;
        } else {
            ctx.body = {
                message: `Device was added`,
                device: {
                    id: device.id,
                }
            }
            ctx.status = 200;
        }

        return next();
    },
    deleteDevice: async (ctx, next) => {
        const {id} = ctx.query;

        ctx.body = await deviceService.deleteDeviceById(id);
        ctx.status = 200;

        return next();
    }
}
