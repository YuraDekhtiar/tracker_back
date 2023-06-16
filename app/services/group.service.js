const db = require("../models");
const Group = db.group;
const GroupUser = db.groupUser;
const GroupDevice = db.groupDevice;

module.exports = {
    getAll: async () => {
        return await Group.findAndCountAll().then(r => {
                return {
                    totalCount: r.count,
                    groups: r.rows.map(item => item)
                }
            }
        )
    },
    groupsCurrentUser: async (userId) => {
        return await Group.findAndCountAll({
            include: [
                {
                    model: db.user,
                    attributes: [],
                    where: {
                        id: userId
                    },
                },
            ],
            attributes: ['id', 'name'],
        }).then(r => {
                return {
                    totalCount: r.count,
                    groups: r.rows.map(item => item)
                }
            }
        )
    },
    groupById: async (id) => {
        return await Group.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: db.device,
                    attributes: ['id', 'name']
                },
                {
                    model: db.user,
                    attributes: ['id', 'username']
                }
            ],
        })
    },
    createGroup: async (name, description) => {
        if (await isExistGroup(name)) {
            return null;
        }
        return await Group.create({
            name: name,
            description: description
        })
    },
    editGroup: async (id, name, description) => {
        return await Group.update({
            name: name,
            description: description,
        }, {
            where: {
                id: id
            }
        })
    },
    deleteGroupById: async (id) => {
        return await Group.destroy({
            where: {
                id: id
            }
        })
    },
    addUserToGroup: async (groupId, userId) => {
        return await GroupUser.create({
                user_id: userId,
                group_id: groupId
            }
        )
    },
    addDeviceToGroup: async (groupId, deviceId) => {
        return await GroupDevice.create({
                device_id: deviceId,
                group_id: groupId
            }
        )
    },
    deleteUserFromGroup: async (groupId, userId) => {
        return await GroupUser.destroy({
                where: {
                    user_id: userId,
                    group_id: groupId
                }
            }
        )
    },
    deleteDeviceFromGroup: async (groupId, device_id) => {
        return await GroupDevice.destroy({
                where: {
                    device_id: device_id,
                    group_id: groupId
                }
            }
        )
    },
}

async function isExistGroup(name) {
    return await Group.findOne({
        where: {
            name: name
        }
    })
}