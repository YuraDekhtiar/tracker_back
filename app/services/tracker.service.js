const DAL = require("../DAL");

module.exports = {
    getAllLocation: () => DAL.getAllLocation(),
    getLastLocation: (id) => DAL.getLastLocation(id),
    addLocation: (data) => {
        return Promise.all([
            DAL.updateTimeLastConnection(data.id),
            DAL.addLocation(data)
        ])
    },
}