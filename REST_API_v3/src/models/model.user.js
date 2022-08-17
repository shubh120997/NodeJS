const jwt = require("jsonwebtoken");
const dbconn = require("../../config/db.config");
const bcrypt = require("bcrypt");

exports.register = (input, result) => {
    const {fname, lname, age, gender, email, pass} = input;

    const insertToken = jwt.sign(email, process.env.TOKEN_SECRET);
    const query = `INSERT INTO users_registration (firstName, lastName, age, gender, type, status)
                        VALUES(?,?,?,?, "user", "active")`;

    dbconn.query(query, [fname, lname, age, gender], (err, data) => {
        if(!err){
            const query = `INSERT INTO user_login (email, password, token, user_id)
                            VALUES(?,?,?,?)`;
            const hashPass = bcrypt.hashSync(pass,10);
            console.log(hashPass);
            dbconn.query(query, [email, hashPass, insertToken, data.insertId], (err, data) => {
                if(err) result(err, null);
                else result(data, null);
            });
        }
        else result(err, null);
    });
}

exports.login = (input, result) => {
    const query = "SELECT password, user_id, token FROM user_login WHERE email = ?";
    const output = {name : "", password : "", token : ""};
    dbconn.query(query, input, (err, data) => {
        console.log(data);
        if(err) result(err, null);
        if(data.length == 0){
            result(null, output);
        }
        else{
            output.password = data[0].password;
            output.token = data[0].token;
            const query = "SELECT firstName FROM users_registration WHERE id = ?";
            dbconn.query(query, data[0].user_id, (err, data) => {
                if(err) result(err, null);
                else{
                    output.name = data[0].firstName;
                    result(null, output);
                }            
        });  
        }
              
    });
}

exports.getAll = (result) => {
    const query = `SELECT firstName, lastName, gender, age, email from users_registration as reg
                    JOIN user_login as log ON reg.id = log.user_id`;

    dbconn.query(query, (err, data) => {
        if(err) result(err, null);
        else result(null, data);
    });
}

// exports.forgot = ()