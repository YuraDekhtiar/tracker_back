module.exports = async (ctx, next) => {
    await next();

    if(!ctx.user?.roles.includes('user')) {
        ctx.throw(403);
    }


}
