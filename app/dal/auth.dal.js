const queryDB = require("../db/sqlDB");

module.exports = {
    getUsernameOrEmailPassword: async (username) => {
        return await queryDB(`SELECT * FROM users WHERE username = '${username}' OR email = '${username}' LIMIT 1`)
            .then(r => r[0]);
    },
    getRolesByUserId: async (id) => {
        return await queryDB(`SELECT roles.name FROM user_roles INNER JOIN roles ON roles.id = user_roles.id WHERE user_id = ${id}`)
            .then(r => r.map(v => v.name));
    }
}
