const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const bp = require("body-parser");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
var cookieParser = require("cookie-parser");

var urlencodedParser = bp.urlencoded({ extended: false });
let user, jwt_token;

async function checkUser(conn, email, password) {
  return new Promise(async (resolve, reject) => {
    await conn
      .promise()
      .query("select * from users where email = ? and password = ?", [
        email,
        password
      ])
      .then(result => resolve(result[0]))
      .catch(err => reject(err));
  });
}

//profile

//login
router.get("/", (req, res) => {
  if (req.cookies.AccessToken) {
    res.render("login", { title: "Login", msg: "", login: "1" });
  } else {
    res.render("login", { title: "Login", msg: "", login: "0" });
  }
});

router.post("/", urlencodedParser, async (req, res) => {
  const { email, password } = req.body;
  pool.getConnection(async (err, conn) => {
    if (err) throw err;
    await checkUser(conn, email, password)
      .then(result => {
        if (result.length === 0) {
          if (req.cookies.AccessToken) {
            res.render("login", {
              title: "Login",
              msg: "Either Email or password is wrong",
              login: "1"
            });
          } else {
            res.render("login", {
              title: "Login",
              msg: "Either Email or password is wrong",
              login: "0"
            });
          }
        } else if (result.length > 0) {
          user = result[0];
          let token = jwt.sign({ user: user.email }, "invicta");
          jwt_token = token;
          const cookieOptions = {
            httpOnly: true,
            expires: 0
          };
          res.cookie("AccessToken", token, cookieOptions);

          res.redirect("/profile");
        }
      })
      .catch(err => console.log("login" + err));
    conn.release();
  });
  //   let user_exists =
  //     "select exists ( select * from campus_ambassador where email = ? AND password = ? ) as exist";
  //   conn.query(user_exists, [email, password], (err, result) => {
  //     if (err) throw err;
  //     if (result[0].exist === 1) {
  //       //create jason web token
  //       const token = jwt.sign({ email: email }, "invicta");
  //       res.header("auth-token", token).send("welcome to the page");
  //     } else {
  //       res.render("login", {
  //         title: "loign",
  //         msg: "Either email or password is incorrect"
  //       });
  //     }
  //   });
});

//register

//profile
router.get("/profile", (req, res) => {});

module.exports = router;
