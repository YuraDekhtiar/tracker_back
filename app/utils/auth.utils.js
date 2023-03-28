const jwt = require("jsonwebtoken");
const {tokenSecret, refreshTokenSecret} = require("../config/auth.config");

module.exports = {
    makeAccessToken: (payload) => {
        return makeAccessToken(payload);
    },
    makeRefreshToken: (payload) => {
        return makeRefreshToken(payload);
    },
}

function makeAccessToken (payload) {
    const options = {
        expiresIn: '1m'
    }
    return jwt.sign(payload, tokenSecret, options);
}

function makeRefreshToken(payload) {
    const options = {
        expiresIn: '60d'
    }
    return jwt.sign(payload, refreshTokenSecret, options);
}
