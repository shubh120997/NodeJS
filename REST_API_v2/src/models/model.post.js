const dbconn = require("../../config/db.config");

exports.all = (result) => {
    const query = `SELECT title, content, user_id FROM posts WHERE status = 'active'`;
    dbconn.query(query, (err, data) => {
        if(err) result(err, null);
        else result(null, data);
    });
}

exports.individual = (id, result) => {
    const query = `SELECT * FROM posts WHERE user_id = ? && status = 'active'`;
    dbconn.query(query, id, (err, data) => {
        if(err) result(err, null);
        else result(null, data);
    });
}

exports.add = (id, input, result) => {
    const title = input.title;
    const content = input.content;

    const query = `INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)`;

    dbconn.query(query, [title, content, id], (err) => {
        if(err) result(err, null);
        else result(null, "Data is inserted");
    });
}

exports.edit = (id, post_id, input, result) => {
    const query = `UPDATE posts SET ? WHERE id = ? && user_id = ? && status = 'active'`;
    
    dbconn.query(query, [input, post_id, id], (err) => {
        if(err) result(err, null);
        result(null, "Data is updated sucessfully");
    });
}

exports.delete = (id, post_id, result) => {
    const query = `UPDATE posts SET status = 'deactive' WHERE id = ? && user_id = ?`;
    dbconn.query(query, [post_id, id], (err) => {
        if(err) result(err, null);
        result(null, "Data is deleted sucessfully");
    });
}


// master : gppFsj5rLVYi4VA8Gyxw
// db_name : mydb