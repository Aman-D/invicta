const express = require('express');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const bp = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();



var jsonParser = bp.json()
var urlencodedParser = bp.urlencoded({ extended: false })


app.use(cors());
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//connecting to database
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: " ",
//     database: 'aman'
//   });
  
//   con.connect((err)=>{
//       if(err) throw err;
//       console.log("database connected");
//   });



app.get('/', (req,res)=>{
//    res.sendFile(path.join(__dirname, "public","index.html"));
    res.render('homepage.ejs',{title: "invicta20"});

});

app.post('/', urlencodedParser, function (req, res) {
    console.log(req.body.email);
    let sql = "insert into email (email) values ('"+ req.body.email +"')";
    con.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
    })
  })


 

app.listen(PORT, ()=>{
    console.log("server is running on ");
});