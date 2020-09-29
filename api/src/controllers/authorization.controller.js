const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwt_key = require("../../config/env.config.js").key;

exports.login = (req, res) => {
  try {
    let refreshId = req.body.userId + jwt_key;
    console.log("paso 1");
    let salt = crypto.randomBytes(16).toString("base64");
    console.log("paso 2");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    console.log("paso 3");
    req.body.refreshKey = salt;
    console.log("paso 4");
    let token = jwt.sign(req.body, jwt_key);
    console.log("paso 5");
    let b = Buffer.from(hash);
    console.log("paso 6");
    let refresh_token = b.toString("base64");
    console.log("paso 7");
    console.log(`Access Token: ${token} ; Refresh Token: ${refresh_token}`);
    res.status(201).send({ accessToken: token, refreshToken: refresh_token });
    console.log("paso 8");
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
