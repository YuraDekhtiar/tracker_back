const deviceService = require("../services/device.service");

module.exports = {
    login: async (ctx, next) => {
        console.log(ctx.headers)

        const {login, password} = ctx.request.body;
        const device = await deviceService.login(login, password)

        if(device) {
            ctx.body = device
        } else {
            ctx.body = {
                message: "Login or password incorrect"
            };
            ctx.throw(403);
        }
        ctx.status = 200;
        return next();
    },
    logout: async (ctx, next) => {
        const res = await deviceService.logout(ctx.request.body.refreshToken || '');
        if(!res?.[0] > 0)
            ctx.throw(400)
        ctx.status = 200;
        return next();
    },
    refreshToken: async (ctx, next) => {
        const res = await deviceService.refreshToken(ctx.request.body.refreshToken || '')

        if(res) {
            ctx.body = res
        } else {
            ctx.body = {
                message: "Refresh token not found in database"
            };
            ctx.throw(403);
        }

        ctx.status = 200;
        return next();
    }
}
