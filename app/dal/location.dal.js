const {queryDB}  = require("../db");

module.exports = {
    getAllLocation: async () => {
        return await queryDB(`SELECT * FROM tracks`);
    },
    getLastLocation: async (id) => {

        return await queryDB(`SELECT *, (SELECT name FROM devices WHERE devices.id = ${id}) AS name 
                                    FROM tracks WHERE device_id = ${id} ORDER BY time DESC LIMIT 1`)
    },
    addLocation: async ({id, time, latitude, longitude, speed, batteryLevel, batteryTemp, isCharging}) => {
        return await queryDB(`INSERT INTO tracks (device_id, time, coords, speed, battery_level,
                temp, is_charging)
            VALUES ('${id}', '${time}', POINT(${latitude}, ${longitude}), 
            '${speed}', '${batteryLevel}', '${batteryTemp}', '${isCharging.toLowerCase() === 'true' ? 1 : 0}')
        `);
    },
    updateTimeLastConnection: async(id) => {
        return await queryDB(`UPDATE devices SET time_last_connection = current_timestamp() WHERE id = ${id}`)
    },
    getAllDevices: async () => {
        return await queryDB(`SELECT id, login, name, time_last_connection FROM devices`)
    }
}
