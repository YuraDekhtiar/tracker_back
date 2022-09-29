module.exports = (Joi) => Joi.object()
    .keys({
        id: Joi.number()
            .integer()
            .required(),
    });