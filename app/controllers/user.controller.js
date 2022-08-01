const db = require("../models");
const User = db.user;
const Role = db.role
const profileService = require("../services/profile.service")

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
    changePassword: async (ctx, next) => {
        const res = await profileService.changePassword(ctx.user.id, ctx.request.body.oldPassword, ctx.request.body.newPassword);
        console.log(res)
        if(!res)  {
            ctx.body = {
                message: "Incorrect old password!"
            }
            ctx.throw(404)
        } else {
            ctx.body = res;
            ctx.status = 200;
        }

        next();
    }
}