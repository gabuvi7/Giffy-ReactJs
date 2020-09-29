const User = require("../models/user.model");
const crypto = require("crypto");
const UserController = require("../controllers/user.controller");

exports.isPasswordAndUserMatch = (req, res, next) => {
  User.findByEmail(req.body.email).then((user) => {
    if (!user[0]) {
      res.status(404).send({ error: "error perri" });
    } else {
      let passwordFields = user[0].password.split("$");
      let salt = passwordFields[0];
      let hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      if (hash === passwordFields) {
        req.body = {
          __id: user[0]._id,
          email: user[0].email,
          name: user[0].name,
        };
        return next();
      } else {
        return res.status(400).send({ errors: ["Invalid email or password"] });
      }
    }
  });
};

exports.hasAuthValidFields = (req, res, next) => {
  let errors = [];
  if (req.body) {
    if (!req.body.email) {
      errors.push("Missing email field");
    }
    if (!req.body.password) {
      errors.push("Missing password field");
    }
    if (errors.length) {
      return res.status(400).send({ errors: errors.join(",") });
    } else {
      console.log(
        "Entra al return next de has auth valid fields. Req body: ",
        req.body
      );
      return next();
    }
  } else {
    return res
      .status(400)
      .send({ errors: "Missing email and password fields" });
  }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
  console.log("Entra al is password and user match");
  UserController.findByEmail(req.body.email).then((user) => {
    if (!user[0]) {
      res.status(404).send({ errors: "Invalid email or password" });
    } else {
      let passwordFields = user[0].password.split("$");
      let salt = passwordFields[0];
      let hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      if (hash === passwordFields[1]) {
        console.log("entro al hash === passwordFields[1]: ", req.body);
        req.body = {
          userId: user[0]._id,
          email: user[0].email,
          permissionLevels: user[0].permissionLevels,
          provider: "email",
          name: user[0].name + " " + user[0].surname,
        };
        return next();
      } else {
        return res.status(400).send({ errors: "Invalid email or password" });
      }
    }
  });
};
