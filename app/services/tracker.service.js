const DAL = require("../dal/location.dal");

module.exports = {
    getAllLocation: () => DAL.getAllLocation(),
    getLastLocation: (ctx) => {
        if (!Number.isNaN(Number.parseInt(ctx.query.id)))
            return DAL.getLastLocation(ctx.query.id)
        throw ctx.throw(500)
    },
    addLocation: (data) => {
        return Promise.all([
            DAL.updateTimeLastConnection(data.id),
            DAL.addLocation(data)
        ])
    },
}
