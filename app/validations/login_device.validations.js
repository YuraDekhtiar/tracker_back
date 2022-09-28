
module.exports = (Joi) => Joi.object()
    .keys({
        login: Joi.number()
            .min(1)
            .max(999999999999999)
            .required(),
        password: Joi.string()
            .min(8)
            .max(64)
            .required(),
    });