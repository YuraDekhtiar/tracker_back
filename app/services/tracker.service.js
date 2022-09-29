const DAL = require("../dal/location.dal");
const {INTEGER} = require("sequelize");

module.exports = {
    getAllLocation: () => DAL.getAllLocation(),
    getLastLocation: (ctx) => {
        return DAL.getLastLocation(ctx.query.id)
    },
    addLocation: (data) => {
        return Promise.all([
            DAL.updateTimeLastConnection(data.id),
            DAL.addLocation(data)
        ])
    },
}
