const deviceService = require("../services/device.service");

module.exports = {
    login: async (ctx, next) => {
        const {login, password} = ctx.request.body;
        const device = await deviceService.login(login, password);

        if(device) {
            ctx.body = device;
            ctx.status = 200;
        } else {
            ctx.body = {
                message: "Login or password incorrect"
            };
            ctx.status = 403;
        }

        return next();
    },
    logout: async (ctx, next) => {
        const res = await deviceService.logout(ctx.request.body.refreshToken || '');

        if(!res?.[0] > 0)
            ctx.status = 400;
        else {
            ctx.body = "OK"
            ctx.status = 200;
        }

        return next();
    },
    refreshToken: async (ctx, next) => {
        const {refreshToken} = ctx.request.body.refreshToken || '';
        const res = await deviceService.refreshToken(refreshToken);

        if(res) {
            ctx.body = res;
            ctx.status = 200;
        } else {
            ctx.body = {
                message: "Refresh token not found in database"
            };
            ctx.status = 403;
        }

        return next();
    }
}
