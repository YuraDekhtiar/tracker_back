module.exports = (Joi) => Joi.object()
    .keys({
        time: Joi.date()
            .max('now')
            .required(),
        latitude: Joi.number()
            .min(-90)
            .max(90)
            .required(),
        longitude: Joi.number()
            .min(-180)
            .max(180)
            .required(),
        speed: Joi.number()
            .min(0)
            .max(999)
            .required(),
        batteryLevel: Joi.number()
            .min(0)
            .max(100)
            .required(),
        batteryTemp: Joi.number()
            .min(-100)
            .max(200)
            .required(),
        isCharging: Joi.boolean()
            .required()
    });