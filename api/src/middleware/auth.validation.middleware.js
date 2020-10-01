const jwt = require("jsonwebtoken");
const jwt_key = require("../../config/env.config.js").key;

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send({ error: "Not Authorized" });
      } else {
        req.jwt = jwt.verify(authorization[1], jwt_key);
        return next();
      }
    } catch (err) {
      return res
        .status(403)
        .send({
          error:
            "You don't have access to this content. Error in validJWTNeeded",
        });
    }
  } else {
    return res
      .status(401)
      .send({ error: "Not Authorized. Error in validJWTNeeded" });
  }
};
