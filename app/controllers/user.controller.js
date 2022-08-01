const db = require("../models");
const User = db.user;
const Role = db.role

module.exports = {
    profile: async (ctx, next)  => {
        ctx.body = await User.findOne({
            where: {
              id: ctx.user.id
            },
            attributes: { exclude: ['password'] },
            include:[{
                model:Role,
                through: {attributes:[]},
                attributes: ['name'],
            }]
        })

        ctx.status = 200;
        next();
    },
    users: async (ctx, next) => {
        ctx.body = await User.findAll({
            where: {
                id: ctx.user.id
            },
            attributes: { exclude: ['password'] },
            include:[{
                model:Role,
                through: {attributes:[]},
                attributes: ['name'],
            }]
        })

        ctx.status = 200;
        next();
    }
}