const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const Role = db.role
const UserRole = db.userRole

module.exports = {
    getAllUsers: async () => {
        return await User.findAll({
            attributes: { exclude: ['password'] },
            include:[{
                model:Role,
                through: {attributes:[]},
                attributes: ['name'],
            }]
        })
    },
    getUserById: async (id) => {
        return await User.findOne({
            where: {
                id: id
            },
            attributes: { exclude: ['password'] },
            include:[{
                model:Role,
                through: {attributes:[]},
                attributes: ['name'],
            }]
        })
    },
    getUserByNameOrEmail: async (username, email) => {
        return await User.findOne({
            where: {
                [Op.or]: [
                    {username: username},
                    {email: email}
                ]
            },
        });
    },
    createUser: async (username, email, password, role) => {
        let createdUser;
        let roleId;

        await Promise.all([
            createdUser = await User.create({
                username: username,
                email: email,
                password: password,
            }),
            roleId = await Role.findOne({
                attributes: ['id'],
                where: {
                    name: role
                }
            }).then(r => r.id)
        ]);
        await UserRole.create({
            user_id: createdUser.id,
            role_id: roleId
        });

        return createdUser;
    },
    deleteById: async (id) => {
        return await User.destroy({
            where: {
                id: id
            }
        })
    }
}