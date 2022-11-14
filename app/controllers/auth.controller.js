const auth = require('../services/auth.service')

module.exports = {
    login: async (ctx, next) => {
        const {username, password} = ctx.request.body;
        const user = await auth.login(username, password);

        if(user) {
            ctx.body = user;
            ctx.status = 200;
        } else {
            ctx.body = { message: 'Username or password incorrect' };
            ctx.status = 403;
        }

        return next();
    },
    refreshToken: async (ctx, next) => {
        const refreshToken = ctx.request.body.refreshToken || '';
        const data = await auth.refreshToken(ctx?.currentUser?.id, refreshToken);

        if(data) {
            ctx.body = data;
            ctx.status = 200;
        } else {
            ctx.status = 403;
        }

        return next();
    },
    logout: async (ctx, next) => {
        const refreshToken = ctx.request.body.refreshToken || '';
        ctx.body = await auth.logout(refreshToken);
        ctx.status = 200;

        return next();
    }

}
