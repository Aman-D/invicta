const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.clearCookie("AccessToken").redirect("/login");
});
module.exports = router;
