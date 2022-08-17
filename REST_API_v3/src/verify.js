const jwt = require("jsonwebtoken");

exports.getUserId = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        console.log(jwt.verify(token, process.env.TOKEN_SECRET));
        jwt.verify(token, process.env.TOKEN_SECRET, err => {
            if(err){
                res.json({
                    success : 0,
                    message : "Invalid Token"
                });
            }
            else{
                next();
            }
        });
    }
    else{
        res.json({
            success : 0,
            message : "Unauthorized user"
        });
    }     
    
}