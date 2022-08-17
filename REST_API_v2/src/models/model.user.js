const dbconn = require("../../config/db.config");

exports.selectAll = (result) => {
    const query = `SELECT users.id, firstName, lastName, age, email, phone_no FROM users 
                    JOIN auth ON users.id = auth.user_id WHERE status = 'active'`;
    dbconn.query(query, (err, data) => {
        if(err) result(err, null);
        else result(null, data);
    });
}

exports.individual = (id, result) => {
    const query = `SELECT users.id, firstName, lastName, age, gender, email, phone_no FROM users 
                    JOIN auth ON users.id = auth.user_id 
                    WHERE users.id = ? && status = 'active';`;
    dbconn.query(query,  id, (err, data) => {
        if(err) result(err, null);
        else if(data.length == 0) result(null, "No data");
        else result(null, data); 
    });
}

exports.add = (input, result) => {
    const {firstName, lastName, age, gender, email, phone} = input;
    const query = `INSERT INTO users (firstName, lastName, age, gender, email) 
                    VALUES (?, ?, ?, ?, ?)`;

    dbconn.query(query, [firstName, lastName, age, gender, email], (err, data) => {
        if(!err) {
            const query = "INSERT INTO auth (phone_no, user_id) VALUES (?, ?)";
            dbconn.query(query, [phone, data.insertId], (err) => {
                if(!err) result(null, data);
                else result(err, null);
            });
        }
        else result(err, null);
    });
}

exports.edit = (input, id, result) => {
    if("phone" in input){
        const query = "UPDATE auth SET phone_no = ? WHERE id = ?";
        dbconn.query(query, [input.phone, id], (err) => {
            if(err) console.log(err);
        })
        delete input.phone;
    }
    if(Object.keys(input).length != 0){
        const query = "UPDATE users SET ? WHERE id = ?";
        dbconn.query(query, [input, id], (err) => {
            if(err) result(err, null);
            else result(null, "Data updated sucessfully");
        });
    }
    else result(err, null);
}

exports.delete = (id, result) => {
    const query = "UPDATE users SET status = 'deactive' WHERE id = ?";
    dbconn.query(query, id, (err) => {
        if(err) result(err, null);
        else result(null, "Data is deleted sucessfully");
    });
}