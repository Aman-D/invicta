const express = require("express");
const router = express.Router();
const con = require("../db/db");
const pool = require("../db/db");
const bp = require("body-parser");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
var urlencodedParser = bp.urlencoded({ extended: false });

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

router.get("/modify", (req, res) => {
  res.render("modify", { title: "modify", msg: "no" });
});
router.post("/modify/confirm", urlencodedParser, async (req, res) => {
  const { event_id, event_name, event_intro, event_rules, prize } = req.body;
  console.log(event_id + event_name + event_intro + event_rules + prize);
  pool.getConnection(async (err, conn) => {
    if (err) throw err;
    await conn
      .promise()
      .query(
        "update event_desc set event_name= ? ,event_intro= ? , event_rules = ? , prize = ? WHERE id = ?",
        [event_name, event_intro, event_rules, prize, event_id]
      )
      .then(result => console.log(result))
      .catch(err => {
        throw err;
      });
    conn.release();
  });
  res.redirect("/admin/modify");
});

router.post("/modify", urlencodedParser, async (req, res) => {
  const { event } = req.body;
  pool.getConnection(async (err, conn) => {
    if (err) throw err;
    await conn
      .promise()
      .query("select * from event_desc where id = ? ", [event])
      .then(result => {
        res.render("modify", {
          title: "modify",
          msg: "yes",
          event: result[0][0]
        });
      })
      .catch(err => {
        throw err;
      });
    conn.release();
  });
});

router.get("/", (req, res) => {
  res.render("admin", {
    title: "Admin"
  });
});

module.exports = router;
