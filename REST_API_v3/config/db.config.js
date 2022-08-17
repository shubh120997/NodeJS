const mysql = require("mysql2");

require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});
  
pool.getConnection( (err, connection) => {
    if(err) throw err;
    
    console.log(`Databse connected at ID ${connection.threadId}`);

    const queries = [
        `CREATE TABLE IF NOT EXISTS users_registration(
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            firstName char(10) NOT NULL,
            lastName char(10) NOT NULL,
            age int,
            gender char(7) NOT NULL,
            type char(10) DEFAULT 'user',
            status char(10) DEFAULT 'active'
        )`,
        `CREATE TABLE IF NOT EXISTS user_login(
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email char(20) NOT NULL UNIQUE,
            password char(76),
            token varchar(255),
            user_id int unique,
            FOREIGN KEY(user_id) REFERENCES users_registration(id)
        )`
    ];
    
    for(let i=0; i < queries.length; i++){
        pool.query(queries[i], (err, data) => {
            if(err) console.log(err);
        });
    }
    
   connection.release();
});

module.exports = pool;