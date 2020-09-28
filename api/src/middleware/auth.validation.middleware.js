const User = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const key = require("../../config/env.config").jwt_secret;

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send({ error: "Not Authorized" });
      } else {
        req.jwt = jwt.verify(authorization[1], key);
        return next();
      }
    } catch (err) {
      return res
        .status(403)
        .send({ error: "You don't have access to this content." });
    }
  } else {
    return res.status(401).send({ error: "Not Authorized" });
  }
};
