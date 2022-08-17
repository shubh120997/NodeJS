const mysql = require("mysql2");

require("dotenv").config();

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// const pool = mysql.createPool({
    
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port : process.env.DB_PORT
// });

pool.connect( (err, connection) => {
    if(err) throw err;
    console.log(`Databse connected at ID ${connection.threadId}`);
    // connection.release();
  });

module.exports = pool;

