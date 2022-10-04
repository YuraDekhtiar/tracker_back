module.exports = (schema, validationBody = true) => async (ctx, next) => {

    const { error } = schema.validate(validationBody ? ctx.request.body : ctx.query);

    if (error) {
        console.log("validation.middlewares: ")
        console.log(error)

        ctx.body = error.details[0].message;
        ctx.throw(422);
    }

    return next();
}