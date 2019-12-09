const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const bp = require("body-parser");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");

router.get("/", verify, async (req, res) => {
  jwt.verify(req.token, "invicta", (err, data) => {
    if (err) {
      res.status(403);
    } else {
      pool.getConnection(async (err, conn) => {
        if (err) throw err;
        await conn
          .promise()
          .query("select * from users where email = ? ", [data.user])
          .then(result => {
            console.log(result[0][0].email);
            res.render("profile", {
              title: "Profile",
              user: result[0][0],
              login: "1"
            });
          })
          .catch(err => console.log(err));
        conn.release();
      });
    }
  });
});
module.exports = router;
