const {deviceDal} = require("../dal");

// This middleware checking permissions user who getting location for device
module.exports = async (ctx, next) => {
    const deviceId = ctx.query.id
    const userId = ctx.currentUser.id

    const devices = await deviceDal.deviceToCurrentUser(userId, deviceId)

    if (devices.length === 0 && !ctx.currentUser?.roles.includes('admin')) {
        ctx.throw(404);
    }

    await next();
}
