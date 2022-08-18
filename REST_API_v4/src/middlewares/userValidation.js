const jwt = require("jsonwebtoken");
const model = require("../models/model.user");
const response = {
    success : 0,
    message : "Session expired...Please Login again....."
};

exports.tokenVerify = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(token){
            const data = await jwt.verify(token, process.env.TOKEN_SECRET);
            if(data){
                const user = await model.findByEmail(data.email);
                if(user.token === token){
                    res.locals = {
                        type: data.user_type,
                        email: data.email
                    }
                    next();
                }
                else{
                    return res.send(response);
                }
            }
            else{
                res.json(response);
            }
        }
        else{
            res.json(response);
        }
    }catch(err){
        res.send(err);
    }
}
        
exports.isUser = (req, res, next) => {
    if(res.locals.type == 'user'){
        next();
    }
    else{
        res.send("You don't have the authorization");
    }
}

exports.isAdmin = (req, res, next) => {
    if(res.locals.type == 'admin'){
        next();
    }
    else{
        res.send("You don't have the authorization");
    }
}

