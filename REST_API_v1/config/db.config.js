require("dotenv").config();

const mysql = require('mysql2');
//local mysql db connection
// const dbConn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'node_mysql_crud_db'
// });

// const dbConn = mysql.createConnection({
//     host     : process.env.DB_HOST,
//     user     : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     database : process.env.DB_NAME
//   });

// dbConn.connect((err) => {
//   if (err) throw err;
//   console.log("Database Connected!");
// });

// connection pool
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
    `CREATE  TABLE IF NOT EXISTS employees (
      id BIGINT UNSIGNED AUTO_INCREMENT,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      salary DECIMAL(11,2) UNSIGNED DEFAULT 0.00,
      PRIMARY KEY (id)
    )`
  ];

  for(let i=0; i < queries.length; i++){
      pool.query(queries[i], (err, data) => {
          if(err) console.log(err);
      });
  }
  // connection.release();
});



// module.exports = dbConn;

module.exports = pool;