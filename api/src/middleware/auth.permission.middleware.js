const User = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const key = require("../../config/env.config").jwt_secret;

exports.minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt.userId;
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res
        .status(403)
        .send({ error: "You don't have access to this content." });
    }
  };
};
