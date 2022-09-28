module.exports = (Joi) => Joi.object()
    .keys({
        refreshToken: Joi.string().min(50).required()
    });