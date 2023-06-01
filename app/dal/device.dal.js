const {queryDB} = require("../db");

module.exports = {
    getAllDeviceOutGroup: async (groupId) => {
        return await queryDB(`SELECT id, name FROM devices WHERE id NOT IN 
            (SELECT de.id FROM devices AS de JOIN group_devices AS gd ON gd.device_id = de.id WHERE gd.group_id = ${groupId})
        `)
    },
    getAllDevicesByUserId: async (userId) => {
        return await queryDB(`SELECT de.id, de.login, de.name, de.time_last_connection, 
            DATE_FORMAT(de.time_last_connection ,  "%Y-%m-%d %T") as time_last_connection_convert, gd.group_id FROM devices AS de 
            JOIN group_devices AS gd ON gd.device_id = de.id WHERE gd.group_id IN 
            (SELECT group_id FROM group_users WHERE user_id = ${userId}) GROUP BY de.id
        `)
    },
}
