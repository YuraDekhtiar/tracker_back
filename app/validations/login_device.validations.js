
module.exports = (Joi) => Joi.object()
    .keys({
        login: Joi.number()
            .min(4)
            .max(15)
            .required(),
        password: Joi.string()
            .min(8)
            .max(64)
            .required(),
    });