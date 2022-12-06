const DAL = require("../dal/location.dal");
const authUtil = require("../utils/auth.new.utils");
const db = require("../models");
const {Op} = require("sequelize");
const Device = db.device;
const bcrypt = require("bcrypt");
const {saltRounds} = require("../constants")

module.exports = {
    login: async (login, password) => {
        const device = await Device.findOne({
            where: {
                login: login,
            },
        });

        if(!device || !bcrypt.compareSync(password, device?.password))
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
    addDevice: async (login, name, password) => {
        if(await isExistDeviceLogin(login)) {
            return null;
        }

        return await Device.create({
            login: login,
            name: name,
            password: bcrypt.hashSync(password, saltRounds),
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
            return null;
        }

        let data = {
            login: login,
            name: name
        }

        if(password) {
            data = {
                ...data,
                password: bcrypt.hashSync(password, saltRounds),
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
