const db = require("../models");
const User = db.user;


module.exports = {
    changePassword: async (id, oldPassword, newPassword) => {
        const user = await User.findOne({
            where: {
                id: 1
            }
        });
        if(user?.password !== oldPassword || !user)
            return null
        // return id when success
        return await user.update({password: newPassword}).then(r => r.id)
    }
}