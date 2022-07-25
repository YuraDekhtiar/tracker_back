const DAL = require("../dal/location.dal");
const {util} = require("../utils/index");

module.exports = {
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

function deviceStatus(time) {
    return (Date.now() - time) / 1000 <= 60
}
