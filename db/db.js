const mysql = require('mysql');

//connecting to database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: " ",
    database: 'aman'
  });
  
  con.connect((err)=>{
      if(err) throw err;
      console.log("database connected");
  });

  module.exports = con;