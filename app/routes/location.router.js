const validation = require("../middlewares/validation.middleware");
const userPermission = require("../middlewares/user_permission.middleware");
const schemes = require("../validations");
const trackerController = require("../controllers/tracker.controller");

const Router = require("koa-router");

const locationRouter = new Router();

locationRouter
    // Видалити із device route /locations
    .post('/location', validation(schemes.location), trackerController.addLocation)
    .get('/location', validation(schemes.id, false), userPermission, trackerController.locations)

module.exports = locationRouter.routes();
