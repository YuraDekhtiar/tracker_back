module.exports = async (ctx, next) => {
    if(!ctx.currentUser?.roles.includes('admin')) {
        ctx.status = 403;
    } else {
        await next();
    }
}
