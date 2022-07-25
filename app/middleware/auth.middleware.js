const jwt = require("jsonwebtoken");
const {tokenSecret} = require("../config/auth.config.js");
module.exports = async (ctx, next) => {
  await next();
  const accessToken = ctx.headers["x-access-token"];

  console.log(ctx.headers)

  if (!accessToken) {
    ctx.throw(403);
  }

  await jwt.verify(accessToken, tokenSecret, async (err) => {
    if (err) {
      ctx.throw(401);
    }
  })
}
