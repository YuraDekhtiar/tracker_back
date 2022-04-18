module.exports = async (ctx, next) => {
  try {
    await next();
    if(ctx.status === 404) ctx.throw(404);
  } catch (err) {
    ctx.status = 404;
    ctx.body = {
      error: err.message,
      message: `route < ${ctx.url} > not found`
    };
  }
};


