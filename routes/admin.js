const express = require("express");
const router = express.Router();
const con = require("../db/db");
const pool = require("../db/db");
const bp = require("body-parser");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
var cookieParser = require("cookie-parser");

router.get("/admin_panel/:option", (req, res) => {
  if (req.params.option === "ca") {
    con.query(
      "select * from users where ca = 1 order by firstname",
      (err, result) => {
        if (err) throw err;

        res.render("admin_panel", { title: "User data", user: result });
      }
    );
  } else if (req.params.option === "all") {
    con.query("select * from users order by firstname", (err, result) => {
      if (err) throw err;

      res.render("admin_panel", { title: "User data", user: result });
    });
  }

  console.log(req.params.option);
});

router.get("/", (req, res) => {
  res.render("admin", {
    title: "Admin"
  });
});

module.exports = router;
