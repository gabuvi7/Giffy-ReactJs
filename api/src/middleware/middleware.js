const jwt = require("jsonwebtoken");
const fs = require("fs");
const key = "./config/private.pem";

exports.isAuthorized = (req, res, next) => {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization.split(" ")[1];
    let privateKey = fs.readFileSync(key, "utf8");

    jwt.verify(token, privateKey, { algorithms: "HS256" }, (err, decoded) => {
      if (err) {
        console.log(
          `entro al error ${req.headers.authorization}, key: ${privateKey}`
        );
        return res.status(500).json({ error: `Not authorized ${err}` });
      }
      console.log(decoded);
      return next();
    });
  } else {
    console.log(`Entro al ultimo false, header: ${req.headers.authorization}`);
    return res.status(500).json({ error: "Not authorized" });
  }
};
