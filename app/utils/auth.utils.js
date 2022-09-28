const jwt = require("jsonwebtoken");
const {tokenSecret, refreshTokenSecret} = require("../config/auth.config");
const redis = require("../db/redisDB");

module.exports = {
    makeAccessToken: (user) => {
        return makeAccessToken(user);
    },
    makeRefreshToken: (user) => {
        return makeRefreshToken(user);
    },
    async updateToken(refreshToken) {
        await redis.del(refreshToken)
        const decode = jwt.decode(refreshToken);

        return {
            accessToken: makeAccessToken(decode),
            refreshToken: await makeRefreshToken(decode)
        }
    }
}

function makeAccessToken ({id, username, email, roles}) {
    const payload = {
        id: id,
        username: username,
        email: email,
        roles: roles
    }
    const options = {
        expiresIn: '10m'
    }
    return jwt.sign(payload, tokenSecret, options);
}

async function makeRefreshToken({id, username, email, roles}) {
    const payload = {
        id: id,
        username: username,
        email: email,
        roles: roles
    }
    const options = {
        expiresIn: '60d'
    }
    const refreshToken = jwt.sign(payload, refreshTokenSecret, options);
    await redis.set(refreshToken, email)
    await redis.get(refreshToken);
    return refreshToken;
}