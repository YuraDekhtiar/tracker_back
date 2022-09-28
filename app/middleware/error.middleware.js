module.exports = async (ctx, next) => {
  try {
    await next();
    if(ctx.status === 404) ctx.throw(404);
    if(ctx.status === 200) {
      ctx.body = {
        error: false,
        message: "API-request successfully",
        result: ctx.body
      }
    }
  } catch (err) {
    if (err.status >= 500) console.log('Error handler:', err);
    ctx.status = err.status || 500;
    ctx.body = {
      error: true,
      message: ctx.body?.message || err.message || 'Internal server error',
      status: err.status || 'failed',
      route: `< ${ctx.url} > not found`
    };
    console.error(`ERROR -> ${err.message}, PATH -> ${__filename}, METHOD -> get`);
    console.log(err)
  }
};
