
module.exports = (Joi) => Joi.object()
    .keys({
        id: Joi.number()
            .integer()
            .required(),
        login: Joi.number()
            .integer()
            .required(),
        name: Joi.string()
            .min(5)
            .max(45),
        password: Joi.string()
            .min(8)
            .max(64)
    });