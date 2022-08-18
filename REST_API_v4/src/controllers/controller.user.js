const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const model = require("../models/model.user");

exports.registerUser = async (req, res) => {
    const input = {...req.body};
    try{
        const user = await model.findByEmail(input.email);

        if(user) 
            res.send("Email is already exist please enter another email");
        else {
            const data = await model.registerProfileDetails(input);
            console.log(data.insertId);
            const token = await jwt.sign(
                {email: input.email, user_type: 'user'}, 
                process.env.TOKEN_SECRET,
                {expiresIn: "1h"}
            );
            if(data){
                const hashPass = await bcrypt.hash(input.pass,10);
                await model.registerLoginDetails(input.email, hashPass, data.insertId, token);
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
        const user = await model.findByEmail(req.body.email);
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
        const user = await model.findByEmail(res.locals.email);
        res.send({
            FirstName: user.firstName,
            LastName: user.lastName,
            Age: user.age,
            Email: user.email,
            PhoneNo: user.mobileNo,
            DateOfBirth: user.dob.toLocaleString().split(",")[0]
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
        const user = await model.findByEmail(res.locals.email);
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
        const user = await model.findByEmail(req.body.email);
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

exports.sendMail = async(req, res,) => {
    try{
        const user = await model.findByEmail(res.locals.email);
        if(user){
            let otp = OTPgenerator();
            const data = await model.findOtpByEmail(user.email);
            if(data.length == 0 || data[0].is_verify != 'Yes'){
                await model.insertOtp(user.email, user.user_id, otp);
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.MAIL_ID,
                        pass: process.env.MAIL_PASSWORD,
                    },
                });
                
                let mailOptions = {
                  from: process.env.MAIL_ID,
                  to: res.locals.email,
                  subject: "OTP verification",
                  text: otp,
                };
                
                const info = await transporter.sendMail(mailOptions);
                return res.send("Email send successfully");
            }
            else{
                return res.send("Verification is already done");
            }        
        }
        else{
            return res.send("Email doesn't exists");
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

exports.verifyOtp = async(req, res) => {
    try{
        const data = await model.findOtpByEmail(res.locals.email);
        if(data[0].otp === req.body.otp){
            await model.updateOtpStatus(res.locals.email);
            res.send("Verification Sucessfull");
        }
        else{
            res.send("Otp doesn't match");
        }
    }catch(err){

    }
}

let OTPgenerator = () => {
    let numbers = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += numbers[Math.floor(Math.random() * 10)];
    }
    return OTP;
};
  
  
  