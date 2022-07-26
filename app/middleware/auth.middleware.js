const jwt = require("jsonwebtoken");
const {tokenSecret} = require("../config/auth.config.js");
module.exports = async (ctx, next) => {
  await next();
  const accessToken = ctx.headers["x-access-token"];

  if (!accessToken) {
    ctx.throw(403);
  }

  await jwt.verify(accessToken, tokenSecret, async (err, decoded) => {
    if (err) {
      ctx.throw(401);
    }
    ctx.userId = decoded.id;
  })
}
