const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const bearerToken = req.cookies.AccessToken;
  if (bearerToken) {
    req.token = bearerToken;
    next();
  } else {
    return res.status(401).redirect("/login");
  }

  //   console.log(req.headers);
  //   const token = req.header("auth-token");
  //   console.log(token);
  //   if (!token) {
  //     return res.status(401).send("Access Denied");
  //   }

  //   try {
  //     const verified = jwt.verify(token, "invicta");
  //     req.user = verified;
  //     next();
  //   } catch (error) {
  //     res.status(400).send("Invalid token");
  //   }
};
