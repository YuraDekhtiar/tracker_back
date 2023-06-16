const groupService = require("../services/group.service");

module.exports = {
    groups: async (ctx, next) => {
        ctx.body = await groupService.getAll();
        ctx.status = 200;

        return next();
    },
    groupsCurrentUser: async (ctx, next) => {
        const {id} = ctx.currentUser
        ctx.body = await groupService.groupsCurrentUser(id);
        ctx.status = 200;

        return next();
    },
    groupById: async (ctx, next) => {
        const {id} = ctx.query;
        const group = await groupService.groupById(id);

        if (group) {
            ctx.body = group;
            ctx.status = 200;
        } else {
            ctx.body = {message: 'Group not found'};
            ctx.status = 404;
        }

        return next();
    },
    createGroup: async (ctx, next) => {
        const {name, description} = ctx.request.body;
        const group = await groupService.createGroup(name, description);

        if (group === null) {
            ctx.body = {
                message: 'The name is already in use'
            }
            ctx.status = 409;
        } else {
            ctx.body = {
                message: 'Group was added',
                group: {
                    id: group.id,
                }
            }
            ctx.status = 200;
        }
        return next();
    },
    editGroup: async (ctx, next) => {
        const {id, name, description} = ctx.request.body;
        ctx.body = await groupService.editGroup(id, name, description);
        ctx.status = 200;

        return next();
    },
    deleteGroupById: async (ctx, next) => {
        const {id} = ctx.query;
        ctx.body = await groupService.deleteGroupById(id);
        ctx.status = 200;

        return next();
    },
    addUserToGroup: async (ctx, next) => {
        const {group_id, user_id} = ctx.query
        ctx.body = await groupService.addUserToGroup(group_id, user_id);
        ctx.status = 200;

        return next();
    },
    addDeviceGroup: async (ctx, next) => {
        const {group_id, device_id} = ctx.query
        ctx.body = await groupService.addDeviceToGroup(group_id, device_id);
        ctx.status = 200;

        return next();
    },
    deleteUserFromGroup: async (ctx, next) => {
        const {group_id, user_id} = ctx.query
        ctx.body = await groupService.deleteUserFromGroup(group_id, user_id);
        ctx.status = 200;

        return next();
    },
    deleteDeviceFromGroup: async (ctx, next) => {
        const {group_id, device_id} = ctx.query
        ctx.body = await groupService.deleteDeviceFromGroup(group_id, device_id);
        ctx.status = 200;

        return next();
    }
}
