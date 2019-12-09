const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const bp = require("body-parser");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");

var urlencodedParser = bp.urlencoded({ extended: false });

async function event_desc_table(conn) {
  return new Promise(async (resolve, reject) => {
    await conn
      .promise()
      .query("select * from event_desc")
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

async function create_event_desc_table(conn) {
  return new Promise(async (resolve, reject) => {
    await conn
      .promise()
      .query(
        "create table event_desc(id int not null AUTO_INCREMENT,event_name varchar(100) default ' ', event_intro varchar(1000)  default ' ',event_rules varchar(1000)  default ' ',prize varchar(100)  default ' ', PRIMARY KEY(id,event_name))"
      )
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

async function event_name(conn) {
  return new Promise(async (resolve, reject) => {
    await conn
      .promise()
      .query("select count(event_name) from event_desc")
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

router.get("/", async (req, res) => {
  pool.getConnection(async (err, conn) => {
    if (err) throw err;
    console.log("connected to databse");

    await event_desc_table(conn).catch(err => {
      if (err) {
        console.log(err);
        create_event_desc_table(conn)
          .then(result => console.log("event_desc table created " + result))
          .catch(err => {
            if (err) throw err;
          });
      }
    });
    await event_name(conn)
      .then(async result => {
        if (result[0][0]["count(event_name)"] === 0) {
          await conn
            .promise()
            .query(
              "insert into event_desc (event_name) values ('jam'),('crisis_comittee'),('hindi_debate'),('general_quiz'),('carnival_of_detectives'),('open_mic'),('spirit_of_art'),('art_marathon'),('tree_painting'),('clay_modeling'),('glass_painting'),('stage_play'),('mono_act'),('nukkad_natak'),('aaveg'),('alap'),('dhun'),('bandish'),('feet_on_fire'),('engage'),('jhankar')"
            );
        }
      })
      .catch(err => console.log(err));
    conn.release();
  });

  if (req.cookies.AccessToken) {
    res.render("homepage.ejs", { title: "invicta20", login: "1" });
  } else {
    res.render("homepage.ejs", { title: "invicta20", login: "0" });
  }
});

router.get("/ca_portal", (req, res) => {
  res.render("ca_portal.ejs", { title: "ca_portal" });
});
router.get("/sponsor", (req, res) => {
  res.render("sponsor.ejs", { title: "Sponsors" });
});
router.get("/team", (req, res) => {
  res.render("team.ejs", { title: "Team" });
});
router.get("/event", (req, res) => {
  if (req.cookies.AccessToken) {
    res.render("event.ejs", { title: "Events", login: "1" });
  } else {
    res.render("events.ejs", { title: "Events", login: "0" });
  }
});

module.exports = router;
