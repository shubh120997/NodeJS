const e = require("express");
const dbconn = require("../../config/db.config");

exports.findByEmail = async (email) => {
    const selectQuery = `Select * from user_login log JOIN user_register reg
                        ON reg.id = log.user_id WHERE email = ? and status ='active'`;
    const data = await dbconn.promise().query(selectQuery, email);
    return (data[0])[0];
}

exports.registerProfileDetails = async(input) => {
    const {firstName, lastName, age, gender, dob, mobileNo} = input;
    const query = `INSERT INTO user_register (firstName, lastname, age, gender, dob, mobileNo)
                    Values(?,?,?,?,?,?)`;
    const data = await dbconn.promise().query(query, [firstName, lastName, age, gender, dob, mobileNo]);
    return data[0];
}

exports.registerLoginDetails = (email, pass, id, token) => {
    const query = `INSERT INTO user_login (email, pass, user_id, token) Values(?,?,?,?)`;
    return dbconn.promise().query(query, [email, pass, id, token]);
}

exports.updateToken = (email, token) => {
    const query = `UPDATE user_login SET token = ? WHERE email = ?`;
    return dbconn.promise().query(query, [token, email]);
}

exports.updateDetails = (input, email) => {
    const query = `UPDATE user_register SET ? WHERE id = (
                    SELECT user_id FROM user_login WHERE email = ?)`;
    return dbconn.promise().query(query, [input, email]);
}

exports.updatePassword = (input, email) => {
    const query = `UPDATE user_login SET pass = ? WHERE email = ?`;
    return dbconn.promise().query(query, [input,email]);
}

exports.deleteUser = (input) => {
    const query = `UPDATE user_register SET status = 'deactive' WHERE id = ?`;
    return dbconn.promise().query(query, input);
}

exports.findOtpByEmail = async (email) => {
    const query = `SELECT * FROM OTP WHERE email = ?`;
    const data = await dbconn.promise().query(query, email);
    // console.log(data[0]);
    return data[0];
}

exports.insertOtp = async(email, id, otp) =>{
    const query = `INSERT INTO OTP (email, user_id, otp) VALUES(?, ?, ?)`;
    const data = await dbconn.promise().query(query, [email, id, otp]);
    return;
}

exports.updateOtpStatus = async(email) => {
    const query = `UPDATE OTP SET is_verify = 'Yes' WHERE email = ?`;
    const data = await dbconn.promise().query(query, email);
    return;
}