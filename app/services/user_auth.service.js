const {Op} = require("sequelize");
const bcrypt = require("bcrypt");
const authUtil = require("../utils/auth.utils");
const {lastVisitTimeStamp} = require("./user.service");
const db = require("../models");
const jwt = require("jsonwebtoken");
const {refreshTokenSecret} = require("../config/auth.config");
const userService = require("./user.service");
const Role = db.role;
const User = db.user;
const UserAuthToken = db.userAuthToken;

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
                roles: user.roles.map(r => r.name)
            };
            await lastVisitTimeStamp(user.id);
            const tokens = await createNewTokens(payload)

            return {
                ...payload,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token
            };
        }
        return null;
    },
    logout: async (refreshToken) => {
        return await UserAuthToken.destroy({
            where: {
                auth_token: refreshToken
            }
        })
    },
    refreshToken: async (refreshToken) => {
        if (!await findToken(refreshToken)) {
            return null;
        }

        let payload = null;
        jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
            if (err) {
                throw new Error("Refresh token invalid signature")
            }
            payload = {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email,
                roles: decoded.roles
            };
        })
        await userService.lastVisitTimeStamp(payload.id);
        const tokens = {
            access_token: authUtil.makeAccessToken(payload),
            refresh_token: authUtil.makeRefreshToken(payload)
        }
        await updateToken(refreshToken, tokens.refresh_token);

        return {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token
        }
    },
}

async function createNewTokens(payload) {
    const refreshToken = authUtil.makeRefreshToken(payload);

    await addNewTokenToDatabase(payload.id, refreshToken)

    return {
        access_token: authUtil.makeAccessToken(payload),
        refresh_token: refreshToken
    }
}

async function addNewTokenToDatabase(userId, refreshToken) {
    const maxTotalTokens = 5;
    const data = await UserAuthToken.findAndCountAll({
        where: {
            user_id: userId
        }
    }).then(r => {
        return {
            tokens: r.rows,
            totalTokens: r.count
        }
    })

    if(data.totalTokens < maxTotalTokens) {
        await addTokenToDatabase(userId, refreshToken)
    } else {
        await deleteAllTokensByUserId(data.tokens.map(item => item.id))
        await addTokenToDatabase(userId, refreshToken)
    }
}

async function addTokenToDatabase(userId, refreshToken) {
    return await UserAuthToken.create({
        user_id: userId,
        auth_token: refreshToken,
    });
}

async function deleteAllTokensByUserId(userIds) {
    return await UserAuthToken.destroy({
        where: {
            id: userIds
        }
    })
}

async function updateToken(oldToken, newToken) {
    return await UserAuthToken.update({
            auth_token: newToken
        },
        {
            where: {
                auth_token: oldToken
            }
        }
    )
}

async function findToken(token) {
    return await UserAuthToken.findOne({
        where: {
            auth_token: token
        }
    })
}
