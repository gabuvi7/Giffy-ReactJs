const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const ValidationMiddleware = require("../middleware/auth.validation.middleware");
const PermissionMiddleware = require("../middleware/auth.permission.middleware");
const config = require("../../config/env.config");

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

router.get("/", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(PAID),
  UserController.findAll,
]);

router.post("/", UserController.create);

router.get("/:id", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  UserController.findOne,
]);

router.patch("/:id", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  UserController.update,
]);

router.delete("/:id", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
  UserController.delete,
]);

module.exports = router;
