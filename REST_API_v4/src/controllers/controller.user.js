const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../models/model.user");

exports.registerUser = async (req, res) => {
    const input = {...req.body};
    try{
        const user = await model.findByEmail(input.email);

        if(user[0].length != 0) 
            res.send("Email is already exist please enter another email");
        else {
            const data = await model.registerProfileDetails(input);
            const token = await jwt.sign(
                {email: input.email, user_type: 'user'}, 
                process.env.TOKEN_SECRET,
                {expiresIn: "1h"}
            );
            if(data){
                const hashPass = await bcrypt.hash(input.pass,10);
                await model.registerLoginDetails(input.email, hashPass, data.insertid, token);
                res.send({
                    message: "User signup sucessfully",
                    token: token
                })
            }
        }
    }catch(err){
        res.send(err);
    }
}

exports.loginUser = async (req, res) => {
    try{
        const data1 = await model.findByEmail(req.body.email);
        const user = (data1[0])[0];
        if(user){
            console.log(user);
            if(bcrypt.compareSync(req.body.pass, user.pass)){
                const token = await jwt.sign(
                    {email: user.email, user_type: user.type}, 
                    process.env.TOKEN_SECRET,
                    {expiresIn: "1h"}
                );
                await model.updateToken(user.email, token);
                res.send({
                    message: `Login Sucessfully of ${user.firstName}`,
                    token: token,
                    id: user.user_id
                });
            }   
            else res.send("Incorrect email or password");
        }
        else res.json("Incorrect email or password");
    }catch(err){
        res.send(err);
    }
}

exports.getProfile = async(req, res) => {
    try{
        const data = await model.findByEmail(res.locals.email);
        const userData = (data[0])[0];
        if(!userData){
            return res.send("User doesn't exists");
        }
        res.send({
            FirstName: userData.firstName,
            LastName: userData.lastName,
            Age: userData.age,
            Email: userData.email,
            PhoneNo: userData.mobileNo,
            DateOfBirth: userData.dob.toLocaleString().split(",")[0]
        });
    }catch(err){
        res.send(err);
    }
}

exports.updateProfile = async(req, res) => {
    try{
        const data = await model.updateDetails(req.body, res.locals.email);
        console.log(data);
    }catch(err){
        res.send(err);
    }
}

exports.resetPassword = async(req, res) => {
    try{
        const data = await model.findByEmail(res.locals.email);
        const user = (data[0])[0];
        if(bcrypt.compareSync(req.body.oldPass, user.pass)){
            const hashPass = await bcrypt.hash(req.body.newPass,10);
            await model.updatePassword(hashPass, res.locals.email);
            return res.send("Password Reset Sucessfully");
        }
        else{
            return res.send("Old Password didn't matched");
        }
        
    }catch(err){
        return res.send(err);
    }
}

exports.forgotPassword = async(req, res) => {
    try{
        const data = await model.findByEmail(req.body.email);
        const user = (data[0])[0];
        if(user){
            if(req.body.newPass === req.body.confirmPass){
                const hashPass = await bcrypt.hash(req.body.newPass,10);
                await model.updatePassword(hashPass, req.body.email);
                return res.send("Password Reset Sucessfully");
            }
        }
        
    }catch(err){
        res.send(err);
    }
}

exports.userLogout = async(req, res) => {
    try{
        const token = '';
        await model.updateToken(res.locals.email, token);
        res.send("User Lougout Sucessfully");
    }catch(err){

    }
}

exports.deleteUser = async(req,res) => {
    try{
        await model.deleteUser(req.body.id);
        res.send("User deleted Suceessfully");
    }catch(err){
        res.send(err);
    }
}