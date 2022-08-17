const bcrypt = require("bcrypt");
const model = require("../models/model.user");

exports.userRegister = (req, res) => {
    model.register((req.body), (err, result) => {
        if(err) console.log(err);
        else res.send("Your registration is sucessfull.");
    });
}

exports.userLogin = (req, res, ) => {
    model.login( (req.body.email), (err, data) => {
        if(err) res.send(err);
        if(bcrypt.compareSync(req.body.pass, data.password)){
            res.send(`Login sucessfull of ${data.name} and JWT_Token = ${data.token}`);
        }
        else{
            res.json("Incorrect email or password");
        }
    });
}

exports.getAllUser = (req, res) => {
    model.getAll((err, data) => {
        if(err) res.send(err);
        else res.send(data);
    });
}

exports.forgotPassword = (req, res) => {
    model.forgot((err, data) => {
        if(err) res.send(err);
        else res.send(data);
    });
}
