const Joi = require("joi");
const errorMessage = [];

exports.registerValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        age: Joi.number().optional().min(18).max(110),
        gender: Joi.string().optional().valid('Male', 'male', 'Female', 'female', 'other', 'Other'),
        dob: Joi.date().optional().min('01-01-1947'),
        mobileNo: Joi.string().length(10).optional(),
        email: Joi.string().email().required(), //{minDomainSegments: 3,tlds:{allow:['com', 'net']}}
        pass: Joi.string().regex(/^[a-zA-Z0-9!@#]{8,15}$/)
    }).unknown(true)

    // const response = schema.validate(req.body);
    const {error} = schema.validate(req.body, {abortEarly: false});
    // console.log(error);
    if(error){
        for(let i=0; i<error.details.length; i++)
            errorMessage[i] = error.details[i].message
        res.send(errorMessage);
    } 
    else next();
}

exports.loginValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(), //{minDomainSegments: 3,tlds:{allow:['com', 'net']}}
        pass: Joi.string().regex(/^[a-zA-Z0-9!@#]{8,15}$/).required()
    }).unknown(true)

    const {error} = schema.validate(req.body, {abortEarly: false});
    
    if(error){
        for(let i=0; i<error.details.length; i++)
            errorMessage[i] = error.details[i].message
        res.send(errorMessage);
    }
    else next();
}

exports.updateValidation = async(req, res, next) => {
    try{
        // if("email" in req.body) 
        //     return res.send("Email can not be changed");
        const schema = Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string(),
            age: Joi.number().optional().min(18).max(110),
            gender: Joi.string().optional().valid('Male', 'male', 'Female', 'female', 'other', 'Other'),
            dob: Joi.date().optional().min('01-01-1947'),
            mobileNo: Joi.string().length(10).optional()
        });

        const {error} = await schema.validate(req.body, {abortEarly: false});
        if(error){
            for(let i=0; i<error.details.length; i++)
                errorMessage[i] = error.details[i].message
            return res.send(errorMessage);
        }
        else next();
    }catch(err){
        return res.send(err);
    }
}

exports.resetPassValidation = async(req, res, next) => {
    try{
        const schema = Joi.object().keys({
            oldPass: Joi.string().regex(/^[a-zA-Z0-9!@#]{8,15}$/).required(),
            newPass: Joi.string().regex(/^[a-zA-Z0-9!@#]{8,15}$/).required(),
            confirmPass: Joi.string().valid(Joi.ref('newPass')).required()
        });
        const {error} = await schema.validate(req.body, {abortEarly: false});
        // const result = await schema.validate(req.body, {abortEarly: false});
        // console.log(result.error);
        if(error){
            for(let i=0; i<error.details.length; i++)
                errorMessage[i] = error.details[i].message
            return res.send(errorMessage);
        }
        else next();
    }catch(err){
        return res.send(err);
    }
}