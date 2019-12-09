// get the client
const mysql = require("mysql2");

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "invicta.cvyu9vbftlk3.ap-south-1.rds.amazonaws.com",
  user: "Admin",
  database: "invicta",
  password: "amandhurwey",
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  port: "3306"
});

//   pool.getConnection((err)=>{
//       if(err) throw err;
//       console.log("database connected");
//   });
//   pool.getConnection(function(err, conn) {
//     // Do something with the connection
//     conn.connect((err)=>{
//         if(err) throw err;
//         console.log(":database connected");
//     })(/* ... */);
//     // Don't forget to release the connection when finished!
//     pool.releaseConnection(conn);
//  })

module.exports = pool;
