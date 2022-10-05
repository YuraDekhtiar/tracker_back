module.exports = async (ctx, next) => {
    await next();

    if(!ctx.currentUser?.roles.includes('admin')) {
        ctx.status = 403;
    }
}
