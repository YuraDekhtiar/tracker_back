
module.exports = (Joi) => Joi.object()
    .keys({
        id: Joi.number()
            .integer()
            .required(),
        name: Joi.string().required()
            .min(2)
            .max(50),
        description: Joi.string().min(0).max(255)
    });
