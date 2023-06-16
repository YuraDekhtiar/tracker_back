const {queryDB} = require("../db");

module.exports = {
    getAllDeviceOutGroup: async (groupId) => {
        return await queryDB(`SELECT id, name FROM devices WHERE id NOT IN 
            (SELECT de.id FROM devices AS de JOIN group_devices AS gd ON gd.device_id = de.id WHERE gd.group_id = ${groupId})
        `)
    },
    getAllDevicesByUserId: async (userId) => {
        return await queryDB(`SELECT de.id, de.login, de.name, de.time_last_connection, gd.group_id FROM devices AS de 
            JOIN group_devices AS gd ON gd.device_id = de.id WHERE gd.group_id IN 
            (SELECT group_id FROM group_users WHERE user_id = ${userId}) GROUP BY de.id
        `)
    },
    deviceToCurrentUser: async (userId, deviceId) => {
        return await queryDB(`SELECT * FROM group_users AS gu JOIN group_devices AS gs 
            ON gu.group_id = gs.group_id WHERE gu.user_id = ${userId} AND gs.device_id = ${deviceId}
        `)
    }
}
