
module.exports = (Joi) => Joi.object()
    .keys({
        username: Joi.string().required()
            .min(4)
            .max(64),
        password: Joi.string().required()
            .min(8)
            .max(64)
    });