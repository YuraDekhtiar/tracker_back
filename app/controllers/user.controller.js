const db = require("../models");
const User = db.user;
const Role = db.role
const UserRole = db.userRole
const profileService = require("../services/profile.service")
const {Op} = require("sequelize");
module.exports = {
    profile: async (ctx, next)  => {
        ctx.body = await User.findOne({
            where: {
              id: ctx.currentUser.id
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
        const res = await profileService.changePassword(ctx.currentUser.id, ctx.request.body.oldPassword, ctx.request.body.newPassword);
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
    },
    createNewUser: async (ctx, next) => {
        let roleId;
        let createdUser;

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {username: ctx.request.body.username},
                    {email: ctx.request.body.email}
                ]
            },
        });

        if (user) {
            ctx.body = {
                message: "Username or email is already taken"
            }
            ctx.throw(404)
        }

        await Promise.all([
            createdUser = await User.create({
                username: ctx.request.body.username,
                email: ctx.request.body.email,
                password: ctx.request.body.password,
            }),
            roleId = await Role.findOne({
                attributes: ['id'],
                where: {
                    name: ctx.request.body.role
                }
            }).then(r => r.id)
        ])
        await UserRole.create({
            user_id: createdUser.id,
            role_id: roleId
        })

        ctx.body = {
            message: `User was created`,
            user: {
                id: createdUser.id,
                email: createdUser.email,
                username: createdUser.username
            }
        }
        ctx.status = 200;
        next();
    },
    deleteUser: async (ctx, next) => {
        if(!ctx.query.id) ctx.throw(404)
        await User.destroy({
            where: {
                id: ctx.query.id
            }
        })
        ctx.status = 200;

        next();
    }
}
