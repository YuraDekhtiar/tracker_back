module.exports = (Joi) => Joi.object()
    .keys({
        refreshToken: Joi.string().token()
            .required()
    });