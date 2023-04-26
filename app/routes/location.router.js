const validation = require("../middlewares/validation.middleware");
const schemes = require("../validations");
const trackerController = require("../controllers/tracker.controller");
const Router = require('koa-router');

const locationRouter = new Router();

locationRouter
    .get('/locations', validation(schemes.id, false), trackerController.locations)

module.exports = locationRouter.routes();
