const queryDB = require("../db/sqlDB");

module.exports = {
    getUsernameEmailPassword: async (username) => {
        return await queryDB(`SELECT * FROM users WHERE username = '${username}' OR email = '${username}' LIMIT 1`);
    },
}
