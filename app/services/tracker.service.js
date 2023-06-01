const DAL = require("../dal/location.dal");

module.exports = {
    getAllLocation: () => DAL.getAllLocation(),
    getLastLocation: (ctx) => {
        return DAL.getLastLocation(ctx.query.id)
    },
    addLocation: (data) => {
        return Promise.all([
            DAL.addLocation(data),
            DAL.updateTimeLastConnection(data.id)
        ])
    },
}
