const dbconn = require("../../config/db.config");

exports.findByEmail = (email) => {
    const selectQuery = `Select * from user_login log JOIN user_register reg
                        ON reg.id = log.user_id WHERE email = ? and status ='active'`;
    return dbconn.promise().query(selectQuery, email);
}

exports.registerProfileDetails = (input) => {
    const {firstName, lastName, age, gender, dob, mobileNo} = input;
    const query = `INSERT INTO user_register (firstName, lastname, age, gender, dob, mobileNo)
                    Values(?,?,?,?,?,?)`;
    return dbconn.promise().query(query, [firstName, lastName, age, gender, dob, mobileNo]);
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