const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const bp = require("body-parser");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

var urlencodedParser = bp.urlencoded({ extended: false });
let user, jwt_token;

async function checkUsersTable(conn) {
  return new Promise(async (resolve, reject) => {
    await conn
      .promise()
      .query("select * from users")
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

async function createUsersTable(conn) {
  return new Promise(async (resolve, reject) => {
    await conn
      .promise()
      .query(
        "create table users(uuid varchar(10) NOT NULL,firstname varchar(20) NOT NULL, lastname varchar(20) NOT NULL, gender varchar(20) NOT NULL, college varchar(50) NOT NULL, city varchar(20) NOT NULL, email varchar(30) NOT NULL, password varchar(20) NOT NULL, phone varchar(10) NOT NULL,points int default 0 NOT NULL,refral varchar(20), ca int NOT NULL, PRIMARY KEY(email,uuid) )"
      )
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}
async function checkEmail(conn, email) {
  return new Promise(async (resolve, reject) => {
    await conn
      .promise()
      .query(
        "select exists ( select * from users where email = ? ) as email_exist",
        [email]
      )
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}
async function updateRefral(conn, refral) {
  return new Promise(async (resolve, reject) => {
    await conn
      .promise()
      .query("select email from users where refral = ?", [refral])
      .then(result => {
        if (result[0].length > 0) {
          conn.query("UPDATE users SET points = points + 10 WHERE email = ?", [
            result[0][0].email
          ]);
          resolve(result[0][0].email);
        } else {
          resolve("NoEmail");
        }
      })
      .catch(err => reject(err));
  });
}

async function insert_user(conn, body) {
  const {
    firstname,
    lastname,
    email,
    gender,
    college,
    city,
    phone,
    password,
    position
  } = body;
  console.log(body);
  let refral_code = Math.floor(Math.random() * Math.floor(999));
  let uuid =
    Math.random()
      .toString(16)
      .substring(2, 6) +
    Math.random()
      .toString(16)
      .substring(2, 6);

  return new Promise(async (resolve, reject) => {
    await conn
      .promise()
      .query(
        "insert into users (firstname,lastname,email,college,city,phone,password,gender,refral,uuid,ca,points) values('" +
          firstname +
          "','" +
          lastname +
          "','" +
          email +
          "','" +
          college +
          "','" +
          city +
          "','" +
          phone +
          "','" +
          password +
          "','" +
          gender +
          "','" +
          firstname +
          refral_code +
          "','" +
          uuid +
          "','" +
          position +
          "',0)"
      )
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

router.get("/", (req, res) => {
  if (req.cookies.AccessToken) {
    res.render("register", { title: "Register", msg: "", login: "1" });
  } else {
    res.render("register", { title: "Register", msg: "", login: "0" });
  }
});

router.post(
  "/",
  urlencodedParser,
  [
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
    check("phone").isLength({ min: 10, max: 10 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let msg;
      if (errors.errors[0].param == "phone") msg = "Enter correct phone number";
      if (errors.errors[0].param == "password") msg = "password too short";
      if (errors.errors[0].param == "email") msg = "Enter correct email";
      return res.status(422).render("register", {
        title: "Register",
        msg: msg,
        login: "0"
      });
    }

    //collect data from req
    const { email, refral } = req.body;

    pool.getConnection(async (err, conn) => {
      if (err) throw err;
      console.log("connected to databse");

      await checkUsersTable(conn).catch(err => {
        if (err) {
          createUsersTable(conn)
            .then(result => console.log("user table found" + result))
            .catch(err => console.log("error table not found" + err));
        }
      });

      await checkEmail(conn, email)
        .then(async result => {
          if (result[0][0].email_exist === 1) {
            conn.release();
            return res.render("register", {
              title: "Register",
              msg: "This Email is already registered with us",
              login: "0"
            });
          } else {
            if (refral) {
              await updateRefral(conn, refral)
                .then(result => {
                  if (result === "NoEmail") {
                    return res.render("register", {
                      title: "Register",
                      msg: "Refral is not valid",
                      login: "0"
                    });
                  } else {
                    console.log("Points updated for " + result);
                  }
                })
                .catch(err => console.log(err));
            }

            await insert_user(conn, req.body)
              .then(result => {
                console.log("User created" + result);
                conn.release();
                res.status(200).redirect("/login");
              })
              .catch(err => console.log("User not created", err));
          }
        })
        .catch(err => console.log("email check error " + err));
    });
  }
);
module.exports = router;
