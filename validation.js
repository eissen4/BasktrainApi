const Joi = require('@hapi/joi')


const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(1)
            .required(),
        password: Joi.string()
            .min(1)
            .required(),
        data: {
            email: Joi.string()
                .min(1)
                .required()
                .email(),
            name: Joi.string()
                .min(1)
                .required()
        }
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(1)
            .required(),
        password: Joi.string()
            .min(1)
            .required()
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;