const deviceService = require("../services/device.service");
const db = require("../models");
const Device = db.device;

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
    },
    addDevice: async (ctx, next) => {
        const {login, name, password} = ctx.request.body
        const device = await deviceService.addDevice(login, name, password)
        ctx.body = {
            message: `Device was added`,
            device: {
                id: device.id,
            }
        }
        ctx.status = 200;
        next();
    },
    deleteDevice: async (ctx, next) => {
        if(!ctx.query.id) ctx.throw(404)
        await Device.destroy({
            where: {
                id: ctx.query.id
            }
        })
        ctx.status = 200;
        next();
    }
}
