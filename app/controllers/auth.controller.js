const auth = require('../services/auth.service')
const utils = require('../utils/auth.utils')

module.exports = {
    login: async (ctx, next) => {
        const {username, password} = ctx.request.body;
        const user = await auth.login(username, password);

        if(user) {
            ctx.body = {
                'accessToken' : utils.makeAccessToken(user),
                'refreshToken' : await utils.makeRefreshToken(user)
            };
            ctx.status = 200;
        } else {
            ctx.body = 'Username or password incorrect';
            ctx.status = 403;
        }
        return next();
    },
    refreshToken: async (ctx, next) => {
        const refreshToken = ctx.request.body.refreshToken || '';
        ctx.body = await auth.refreshToken(ctx, refreshToken);
        ctx.status = 200;

        return next();
    },
    logout: async (ctx, next) => {
        ctx.body = await auth.logout(ctx.request.body.refreshToken || '');
        ctx.status = 200;
        return next();
    }

}
