module.exports = async (ctx, next) => {
  try {
    await next();

    if(ctx.status === 200) {
      ctx.body = {
        error: false,
        status: ctx.status,
        message: "API-request successfully",
        result: ctx.body
      };
    } else {
      ctx.throw(ctx.status);
    }
  } catch (err) {
    if (err.status >= 500) console.log("Error handler:", err);
    ctx.status = err.status || 500;
    ctx.body = {
      error: true,
      status: err.status || "failed",
      message: ctx.body?.message || err.message || "Internal server error",
      route: `< ${ctx.url} >`
    };
    console.error(`STATUS -> ${ctx.status}, MESSAGE -> ${err.message}, ROUTE -> ${ctx.url} `);
    console.log(err);
  }
};
