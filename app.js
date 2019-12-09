const express = require("express");
const path = require("path");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const app = express();

const root = require("./routes/root");
const register = require("./routes/register");
const login = require("./routes/login");
const logout = require("./routes/logout");
const profile = require("./routes/profile");
const admin = require("./routes/admin");
const event_land = require("./routes/event_land");
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/profile", profile);
app.use("/event_land", event_land);
app.use("/admin", admin);
app.use("/", root);

app.listen(PORT, () => {
  console.log("server is running on" + PORT);
});
