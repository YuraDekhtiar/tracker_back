const {queryDB} = require("../db");

module.exports = {
    getAllUsersOutGroup: async (groupId) => {
        return await queryDB(`SELECT id, username FROM users WHERE id NOT IN 
            (SELECT us.id FROM users AS us JOIN group_users AS gu ON gu.user_id = us.id WHERE gu.group_id = ${groupId})
        `)
    },
}
