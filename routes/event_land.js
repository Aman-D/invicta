const express = require("express");
const pool = require("../db/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("event_land", { title: "Event_land" });
});

router.get("/technical", (req, res) => {
  res.render("technical", { title: "Technical" });
});

router.get("/cultural", (req, res) => {
  res.render("cultural", { title: "Cultural", event: [] });
});

router.get("/cultural/event_page/:id", (req, res) => {
  console.log(req.params.id);
  pool.getConnection(async (err, conn) => {
    if (err) throw err;
    await conn
      .promise()
      .query("select * from event_desc where id = ?", [req.params.id])
      .then(result => {
        console.log(result[0]);
        res.render("cultural", { title: "Cultural", event: result[0][0] });
      })
      .catch(err => console.log(err));
    conn.release();
  });
});

module.exports = router;
