const express = require("express");
const router = express.Router();
const con = require("../db/db");
const bp = require("body-parser");
const alert = require("alert-node");

var urlencodedParser = bp.urlencoded({ extended: false });

router.get("/", (req, res) => {
  //    res.sendFile(path.join(__dirname, "public","index.html"));
  console.log(req.cookies.AccessToken);
  res.render("homepage.ejs", { title: "invicta20" });
});

router.post("/", urlencodedParser, function(req, res) {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  //checking if user already exists
  let sql =
    "select count(email) as count from  notification where email =  '" +
    req.body.email +
    "' ";

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else if (JSON.stringify(result[0].count) === "1") {
      alert("This email is already registered with us:)", "window");
      res.redirect("/");
    } else {
      //if not then enter it to the databse
      let sql2 =
        "insert into notification (date_created, email) values ('" +
        date +
        "' ,'" +
        req.body.email +
        "')";

      con.query(sql2, (err, result) => {
        if (err) {
          console.log(err);
        }
        res.render("about.ejs", { title: "invicta20" });
      });
    }
  });
});

module.exports = router;
