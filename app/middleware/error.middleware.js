module.exports = async (ctx, next) => {
  try {
    await next();
    if(ctx.status === 404) ctx.throw(404);
  } catch (err) {
    if (err.status >= 500) console.log('Error handler:', err);
    ctx.status = err.status || 500;
    ctx.body = {
      status: err.status || 'failed',
      message: err.message || 'Internal server error',
      route: `< ${ctx.url} > not found`
    };
    console.error(`ERROR -> ${err.message}, PATH -> ${__filename}, METHOD -> get`);
    //console.log(err)
  }
};
