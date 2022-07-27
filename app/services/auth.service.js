const {authDal} = require("../dal");
const utils = require("../utils/auth.utils");
const redis = require("../db/redisDB");
const jwt = require("jsonwebtoken");
const {refreshTokenSecret} = require("../config/auth.config");

module.exports = {
    login: async (username, password) => {
        const user = await authDal.getUsernameOrEmailPassword(username);
        if (!user) {
            return null
        } else if ((username === user.username || username === user.email) && password === user.password) {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                roles: await authDal.getRolesByUserId(user.id)
            }
        }
    },
    refreshToken: async (ctx, refreshToken) => {
        if (!await redis.get(refreshToken)) {
            ctx.throw(401);
        }
        jwt.verify(refreshToken, refreshTokenSecret, (err) => {
            if (err) {
                ctx.throw(401);
            }
        })
        return utils.updateToken(refreshToken);
    },
    async logout(refreshToken) {
        return { logout_success: await redis.del(refreshToken) !== 0 };
    }
}
