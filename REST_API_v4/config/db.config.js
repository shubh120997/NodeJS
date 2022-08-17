const mysql = require("mysql2");

require("dotenv/config");

const pool = mysql.createPool({
    connectionLimit: 10,
    host:            process.env.DB_HOST,
    user:            process.env.DB_USER,
    password:        process.env.DB_PASSWORD,
    database:        process.env.DB_NAME
});

pool.getConnection((err, connection) => {
    if(err) console.log(err);
    console.log(`Databse connected at ID ${connection.threadId}`);

    const queries = [
        `CREATE TABLE IF NOT EXISTS user_register(
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            firstName char(10) NOT NULL,
            lastName char(10) NOT NULL,
            age int NULL,
            gender char(10) NULL,
            dob DATE NULL,
            mobileNo char(10) NULL,
            type char(10) DEFAULT 'user',
            status char(10) DEFAULT 'active'
        )`,
        `CREATE TABLE IF NOT EXISTS user_login(
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email char(20) NOT NULL UNIQUE,
            pass char(76) NOT NULL,
            user_id int unique,
            token varchar(255) NULL,
            FOREIGN KEY(user_id) REFERENCES user_register(id)
        )`,
        `CREATE TABLE IF NOT EXISTS user_post(
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title char(60) NOT NULL, 
            content longtext NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
            user_id int,    
            status char(10) DEFAULT 'pending',
            delete_by char(5) NULL,
            FOREIGN KEY(user_id) REFERENCES user_register(id)
        );`
    ];

    for(let i=0; i < queries.length; i++){
        pool.query(queries[i], (err, data) => {
            if(err) console.log(err);
        });
    }
});

module.exports = pool;