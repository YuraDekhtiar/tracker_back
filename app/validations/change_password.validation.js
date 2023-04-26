
module.exports = (Joi) => Joi.object()
    .keys({
        oldPassword: Joi.string()
            .min(8)
            .max(64)
            .required(),
        newPassword: Joi.string()
            .min(8)
            .max(64)
            .required(),
        confNewPassword: Joi.string()
            .min(8)
            .max(64)
            .required()
    });