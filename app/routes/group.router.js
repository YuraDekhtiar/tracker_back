const groupController = require("../controllers/group.controller");
const Router = require('koa-router');
const validation = require("../middlewares/validation.middleware");
const schemes = require("../validations");
const onlyAdmin = require("../middlewares/admin.middleware");

const groupRouter = new Router().prefix('/group');

groupRouter
    .get('/groups', onlyAdmin, groupController.groups)
    // ДОПИСАТИ КОНТРОЛЕР І СЕРВІС
    .get('/groups-current-user', groupController.groupsCurrentUser)
    .get('/', onlyAdmin, validation(schemes.id, false), groupController.groupById)
    .post('/create', onlyAdmin, validation(schemes.createGroup), groupController.createGroup)
    .post('/edit', onlyAdmin, validation(schemes.editGroup, true), groupController.editGroup)
    .delete('/delete', onlyAdmin, validation(schemes.id, false), groupController.deleteGroupById)
        // Add user to group by id
    .post('/add-user', onlyAdmin, validation(schemes.userIdGroupId, false), groupController.addUserToGroup)
    .post('/add-device', onlyAdmin, validation(schemes.deviceIdGroupId, false), groupController.addDeviceGroup)
        // Delete from group by id
    .delete('/delete-user', onlyAdmin, validation(schemes.userIdGroupId, false), groupController.deleteUserFromGroup)
    .delete('/delete-device', onlyAdmin, validation(schemes.deviceIdGroupId, false), groupController.deleteDeviceFromGroup)
module.exports = groupRouter.routes()
