const groupController = require("../controllers/group.controller");
const Router = require('koa-router');
const validation = require("../middlewares/validation.middleware");
const schemes = require("../validations");
const onlyAdmin = require("../middlewares/admin.middleware");

const groupRouter = new Router();

groupRouter
    .get('/groups', groupController.groups)
    .post('/group/create', onlyAdmin, validation(schemes.createGroup, true), groupController.createGroup)
    .delete('/group/delete', onlyAdmin, validation(schemes.id, false), groupController.deleteGroupById)
    .get('/group', onlyAdmin, validation(schemes.id, false), groupController.groupById)

module.exports = groupRouter.routes()
