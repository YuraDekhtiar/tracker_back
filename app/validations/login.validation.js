
module.exports = (Joi) => Joi.object()
    .keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });