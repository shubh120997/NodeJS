const Joi = require("joi");

exports.validation = (req, res, next) => {
    const schema = Joi.object().keys({
        first_name: Joi.string().required(),
        email: Joi.string().email().required()
    })

    // const response = schema.validate(req.body);
    const {error} = schema.validate(req.body);
    // console.log(error.details[0].message);
    if(error) res.send(error.details[0].message)
    else next();
}

