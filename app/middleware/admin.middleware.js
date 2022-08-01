module.exports = async (ctx, next) => {
    await next();

    if(!ctx.user?.roles.includes('admin')) {
        ctx.throw(403);
    }


}
