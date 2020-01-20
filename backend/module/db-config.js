
const mysql = require("mysql2");
const pool = mysql.createPool({
   connectionLimit: 5,
   host: "localhost",
   user: "user-db-2",
   database: "2tabls",
   password: "1111"
});

module.exports = pool;
