
module.exports = (Joi) => Joi.object()
    .keys({
        name: Joi.string().required()
            .min(4)
            .max(50),
        description: Joi.string().max(255)
    });
