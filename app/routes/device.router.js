const deviceController = require("../controllers/device.controller");
const onlyAdmin = require("../middlewares/admin.middleware");
const validation = require("../middlewares/validation.middleware");
const schemes = require("../validations");
const trackerController = require("../controllers/tracker.controller");

const Router = require("koa-router");

const deviceRouter = new Router();

deviceRouter
    .get('/devices', deviceController.devices)
    .get('/device', onlyAdmin, validation(schemes.id, false), deviceController.deviceById)
    .post('/device/locations', validation(schemes.location), trackerController.addLocation)
    .put('/device/edit', onlyAdmin, validation(schemes.deviceEdit), deviceController.updateDeviceById)
    .post('/device/add-device', onlyAdmin, validation(schemes.device), deviceController.addDevice)
    .delete('/device/delete', onlyAdmin, validation(schemes.id, false), deviceController.deleteDevice)

module.exports = deviceRouter.routes();
