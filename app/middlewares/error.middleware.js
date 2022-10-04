module.exports = async (ctx, next) => {
  try {
    await next();
    if(ctx.status === 404) ctx.throw(404);

    if(ctx.status === 200) {
      ctx.body = {
        error: false,
        status: ctx.status,
        message: "API-request successfully",
        result: ctx.body
      };
    }
  } catch (err) {
    if (err.status >= 500) console.log("Error handler:", err);
    ctx.status = err.status || 500;
    ctx.body = {
      error: true,
      message: ctx.body?.message || err.message || "Internal server error",
      status: err.status || "failed",
      route: `< ${ctx.url} >`
    };
    console.error(`ROUTE -> ${ctx.url}, ERROR -> ${err.message}, STATUS -> ${err.status}`);
    //console.log(err);
  }
};
