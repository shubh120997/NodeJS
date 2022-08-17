const dbconn = require("../../config/db.config");

exports.createPost = (input, id) => {
    const query = `INSERT INTO user_post (title, content, user_id)
                    VALUES (?, ?, ?)`;
    return dbconn.promise().query(query, [input.title, input.content, id]);
}

exports.pendingPost = () => {
    const query = `SELECT id, title, content FROM user_post WHERE status = "pending"`;
    return dbconn.promise().query(query);
}

exports.updatePostStatus = (input) => {
    const query = `UPDATE user_post SET status = ? WHERE id = ?`;
    return dbconn.promise().query(query, [input.status, input.id]);
}

exports.approvedPost = () => {
    const query = `SELECT firstName Name, title Title, content Content FROM user_post post
                    JOIN user_register reg ON reg.id = post.user_id
                    WHERE post.status = 'approved' OR post.status = 'approve'`;
    return dbconn.promise().query(query);
}

exports.findById = (id) => {
    const query = `SELECT title, content from user_post WHERE user_id = ?`;
    return dbconn.promise().query(query, id);
}

exports.deletePost = (id, type, user_id) => {
    if(type === 'admin'){
        const query = `UPDATE user_post SET status='deleted', delete_by='admin'
                        WHERE id = ?`;
        return dbconn.promise().query(query, id);
    }
    else{
        const query = `UPDATE user_post SET status='deleted', delete_by='user'
                        WHERE id = ? AND user_id=?`;
        return dbconn.promise().query(query, [id, user_id]);
    }
}

exports.updatePost = (input) => {
    const id = input.id;
    delete input.id;
    const query = `UPDATE user_post SET ? WHERE id = ?`;
    return dbconn.promise().query(query, [input, id]);
}

exports.allDeleted = () => {
    const query = "SELECT * FROM user_post WHERE status='deleted'";
    return dbconn.promise().query(query);
}