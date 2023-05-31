module.exports = async (ctx, next) => {
    if(!ctx.currentUser?.roles.includes('admin')) {
        ctx.throw(403);
    }
    await next();
}
