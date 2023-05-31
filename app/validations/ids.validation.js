module.exports = {
    id: (Joi) => Joi.object()
    .keys({
        id: Joi.number()
            .integer()
            .required(),
    }),
    userIdGroupId: (Joi) => Joi.object()
        .keys({
            user_id: Joi.number()
                .integer()
                .required(),
            group_id: Joi.number()
                .integer()
                .required(),
        }),
    deviceIdGroupId: (Joi) => Joi.object()
        .keys({
            device_id: Joi.number()
                .integer()
                .required(),
            group_id: Joi.number()
                .integer()
                .required(),
        })
}
