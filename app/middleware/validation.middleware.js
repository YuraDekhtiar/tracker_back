module.exports = (schema) => async (ctx, next) => {
    const { error } = schema.validate(ctx.request.body);

    if (error) {
        console.log(error)

        ctx.body = error.details[0].message;
        ctx.throw(422);
    } else {
        next();
    }
}