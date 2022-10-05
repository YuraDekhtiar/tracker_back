const utils = require("../utils/auth.utils");
const redis = require("../db/redisDB");
const jwt = require("jsonwebtoken");
const {refreshTokenSecret} = require("../config/auth.config");
const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const Role = db.role;

module.exports = {
    login: async (username, password) => {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { email: username }
                ]
            },
            include:[{
                model:Role,
                through: {attributes:[]},
                attributes: ['name']
            }]
        })
        if ((username === user.username || username === user.email) && password === user.password) {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.roles.map(r => r.name),
                accessToken: utils.makeAccessToken(user),
                refreshToken: await utils.makeRefreshToken(user)
            };
        }
        return null;
    },
    refreshToken: async (ctx, refreshToken) => {
        if (!await redis.get(refreshToken)) {
            return null;
        }
        jwt.verify(refreshToken, refreshTokenSecret, (err) => {
            if (err) {
                throw new Error("Refresh token invalid signature")
            }
        })
        return utils.updateToken(refreshToken);
    },
    async logout(refreshToken) {
        return { logout_success: await redis.del(refreshToken) !== 0 };
    }
}
