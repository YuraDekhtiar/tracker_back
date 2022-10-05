const deviceService = require("../services/device.service");
const db = require("../models");
const Device = db.device;

module.exports = {
    devices: async (ctx, next) => {
        ctx.body = await deviceService.getDevices();
        ctx.status = 200;

        return next();
    },
    deviceById: async (ctx, next) => {
        const {id} = ctx.query
        const device = await Device.findOne({
            attributes: { exclude: ['password', 'refresh_token'] },
            where: {
                id: id
            },
        })

        ctx.body = {
            device
        }
        ctx.status = 200;

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
        if(!ctx.query.id) ctx.throw(404)
        await Device.destroy({
            where: {
                id: ctx.query.id
            }
        })
        ctx.status = 200;
        return next();
    }
}
