
module.exports = (Joi) => Joi.object()
    .keys({
        username: Joi.string()
            .min(4)
            .max(64)
            .required(),
        password: Joi.string()
            .min(8)
            .max(64)
    });