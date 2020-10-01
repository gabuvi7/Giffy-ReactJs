const jwt = require("jsonwebtoken");
const jwt_key = require("../../config/env.config.js").key;

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      console.log("paso 1. validJWTNeeded");
      let authorization = req.headers["authorization"].split(" ");
      console.log("paso 2");
      if (authorization[0] !== "Bearer") {
        console.log("paso 3: Entro a no autorizado");
        return res.status(401).send({ error: "Not Authorized" });
      } else {
        console.log("paso 4: Entra a Autorizado");
        console.log("paso 5", authorization);
        console.log("paso 5.1", authorization[0]);
        console.log("paso 5.2", authorization[1]);
        console.log("paso 5.3", jwt_key);
        console.log("paso 5.4", jwt.verify(authorization[1], jwt_key));
        req.jwt = jwt.verify(authorization[1], jwt_key);
        return next();
      }
    } catch (err) {
      console.log("paso 6: Entro al catch ", err);
      return res
        .status(403)
        .send({ error: "You don't have access to this content. Error in validJWTNeeded" });
    }
  } else {
    console.log("paso 7: Entro al ultimo else " );
    return res.status(401).send({ error: "Not Authorized. Error in validJWTNeeded" });
  }
};
