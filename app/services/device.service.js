const DAL = require("../dal/location.dal");
const {util} = require("../utils/index");
const authUtil = require("../utils/auth.new.utils");
const db = require("../models");
const {Op} = require("sequelize");
const Device = db.device;

module.exports = {
    login: async (login, password) => {
        const device = await Device.findOne({
            where: {
                login: login,
                password: password
            },
        });
        if(!device)
            return null;

        return {
            id: device.id,
            login: device.login,
            name: device.name,
            ...await createNewToken(device)
        }
    },
    logout: async (refreshToken) => {
        return Device.update({refresh_token: "null"}, {
            where: {
                refresh_token: refreshToken
            }
        })
    },
    refreshToken: async (refreshToken) => {
        const device =  await Device.findOne({
            where: {
                refresh_token: refreshToken
            }
        })
        if(!device)
            return null;
        return await createNewToken(device)
    },
    getDevices: async () => {
        return await DAL.getAllDevices().then(r => {
            return r.map(item => {
                return {
                    ...item,
                    is_online: deviceStatus(item.time_last_connection)
                }
            })
        })
    },
    getDeviceById: async (id) => {
        return await Device.findOne({
            attributes: { exclude: ['password', 'refresh_token'] },
            where: {
                id: id
            },
        })
    },
    addDevice: async (ctx) => {
        const {login, name, password} = ctx.request.body;
        if(await isExistDeviceLogin(login)) {
            ctx.body = {
                message: "The login is already in use"
            }
            ctx.throw(409);
        }
        return await Device.create({
            login: login,
            name: name,
            password: password
        });
    },
    updateDeviceById: async (id, login, name, password) => {
        const device = await Device.findOne({
            where: {
                id: {
                    [Op.ne]: id
                },
                login: login,
            }
        })
        if(device) {
            ctx.body = {
                message: "The login is already in use"
            }
            ctx.throw(409)
        }

        let data = {
            login: login,
            name: name
        }

        if(password) {
            data = {
                ...data,
                password: password
            }
        }

        return Device.update(data, {
            where: {
                id: id
            }
        });
    },
    deleteDeviceById: async (id) => {
        return await Device.destroy({
            where: {
                id: id
            }
        })
    },
    // переглянути для чого параметри
    // передаються масивом
    getDeviceStatus: async (ctx) => {
        const id = util.toArray(ctx.query.id).map(item => {
            if (!Number.isNaN(Number.parseInt(item)))
                return item
            throw ctx.throw(500)
        })

        return await DAL.getTimeLastConnection(id).then(r => {
            return r.map(item => {
                return {
                    id: item.id,
                    is_online: deviceStatus(item.time_last_connection)
                }
            })
        })
    },

}

async function isExistDeviceLogin(login) {
    return await Device.findOne({
        where: {
            login: login
        }
    })
}

function deviceStatus(time) {
    return (Date.now() - time) / 1000 <= 60
}

async function createNewToken(device) {
    const payload = {
        id: device.id,
        login: device.login,
        name: device.name
    }
    const refreshToken = authUtil.makeRefreshToken(payload);
    await Device.update({
        refresh_token: refreshToken}, {
        where: {
            id: device.id
        }
    });
    return {
        access_token: authUtil.makeAccessToken(payload),
        refresh_token: refreshToken
    }
}
