const utils = require("../utils/auth.utils");
const redis = require("../db/redisDB");
const jwt = require("jsonwebtoken");
const {refreshTokenSecret} = require("../config/auth.config");
const db = require("../models");
const {Op} = require("sequelize");
const userService = require("./user.service");
const bcrypt = require("bcrypt");
const User = db.user;
const Role = db.role;

module.exports = {
    login: async (username, password) => {
        username = username.toLowerCase();
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
        });
        if ((username === user?.username || username === user?.email) && bcrypt.compareSync(password, user?.password)) {
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.roles.map(r => r.name),
            }
            await userService.lastVisitTimeStamp(user.id);

            return {
                ...payload,
                accessToken: utils.makeAccessToken(payload),
                refreshToken: await utils.makeRefreshToken(payload)
            };
        }
        return null;
    },
    refreshToken: async (refreshToken) => {
        if (!await redis.get(refreshToken)) {
            return null;
        }
        let currentUser = null;
        jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
            if (err) {
                throw new Error("Refresh token invalid signature")
            }
            currentUser = {...decoded}
        })
        await userService.lastVisitTimeStamp(currentUser.id);

        return utils.updateToken(refreshToken);
    },
    async logout(refreshToken) {
        return { logout_success: await redis.del(refreshToken) !== 0 };
    }
}
