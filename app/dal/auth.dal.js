const queryDB = require("../db/sqlDB");

module.exports = {
    findRolesByUserId: async (id) => {
        return await queryDB(`SELECT roles.name FROM user_roles INNER JOIN roles ON roles.id = user_roles.id WHERE user_id = ${id}`)
            .then(r => r.map(v => v.name));
    }
}
