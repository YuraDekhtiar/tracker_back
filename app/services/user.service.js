const db = require("../models");
const {userDal} = require("../dal");
const {Op} = require("sequelize");
const bcrypt = require("bcrypt")
const User = db.user;
const Role = db.role;
const Group = db.group;
const UserRole = db.userRole;
const {saltRounds} = require("../constants");

module.exports = {
    getAllUsers: async () => {
        return await User.findAndCountAll({
            attributes: {exclude: ['password']}, include: [{
                model: Role, through: {attributes: []}, attributes: ['name'],
            }]
        }).then(r => {
            return {
                totalCount: r.count, users: r.rows
            }
        })
    }, getUserById: async (id) => {
        return await User.findOne({
            where: {
                id: id
            }, attributes: {exclude: ['password']}, include: [
                { model: Role, through: {attributes: []}, attributes: ['id','name'] },
                { model: Group, through: {attributes: []}, attributes: ['id','name'] }
            ]
        })
    }, getUserByNameOrEmail: async (username, email) => {
        return await User.findOne({
            where: {
                [Op.or]: [{username: username.toLowerCase()}, {email: email.toLowerCase()}]
            },
        });
    }, createUser: async (username, email, password, role) => {
        let createdUser;
        let roleId;

        await Promise.all([createdUser = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: bcrypt.hashSync(password, saltRounds),
        }), roleId = await Role.findOne({
            attributes: ['id'], where: {
                name: role
            }
        }).then(r => r.id)]);
        await UserRole.create({
            user_id: createdUser.id, role_id: roleId
        });

        return createdUser;
    }, deleteUserById: async (id) => {
        return await User.destroy({
            where: {
                id: id
            }
        })
    }, changePassword: async (id, oldPassword, newPassword) => {
        const user = await User.findOne({
            where: {
                id: id
            }
        });

        if (!user || !bcrypt.compareSync(oldPassword, user?.password)) return null
        // return id when success
        return await user.update({password: bcrypt.hashSync(newPassword, saltRounds)}).then(r => r.id)
    },
    lastVisitTimeStamp: async (id) => {
        await lastVisitTimeStamp(id)
    },
    getAllUsersOutGroup: async (id) => {
        const users = await userDal.getAllUsersOutGroup(id).then(r => r.map(i => {
            return {username: i.username, id: i.id}
        }))
        return {
            totalCount: users.length,
            users: users
        }
    },

}

async function lastVisitTimeStamp(id) {
    return await User.update({last_visit: new Date()}, {
        where: {
            id: id
        }
    })
}

