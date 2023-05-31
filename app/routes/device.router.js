const deviceController = require("../controllers/device.controller");
const onlyAdmin = require("../middlewares/admin.middleware");
const validation = require("../middlewares/validation.middleware");
const schemes = require("../validations");
const trackerController = require("../controllers/tracker.controller");

const Router = require("koa-router");

const deviceRouter = new Router().prefix('/device');

deviceRouter
    .get('/devices', deviceController.devices)
    .get('/', onlyAdmin, validation(schemes.id, false), deviceController.deviceById)
    .post('/locations', validation(schemes.location), trackerController.addLocation)
    .put('/edit', onlyAdmin, validation(schemes.deviceEdit), deviceController.updateDeviceById)
    .post('/add-device', onlyAdmin, validation(schemes.device), deviceController.addDevice)
    .delete('/delete', onlyAdmin, validation(schemes.id, false), deviceController.deleteDevice)
    .get('/devices-out-group', onlyAdmin, validation(schemes.id, false), deviceController.getAllDevicesOutGroup)

module.exports = deviceRouter.routes();
