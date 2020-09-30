exports.minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    console.log("paso 1: Entra al minimum permission level required");
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let reqjwt = req.jwt;
    console.log(
      "paso 2",
      user_permission_level,
      " permiso: ",
      req.jwt.permissionLevel,
      " level parseado: ",
      parseInt(req.jwt.permissionLevel),
      " permiso por parametro: ",
      required_permission_level,
      " req.jwt: ",
      reqjwt
    );
    let userId = req.jwt.userId;
    console.log("paso 3", userId);
    if (user_permission_level >= required_permission_level) {
      console.log(
        "paso 4. Entra al if",
        user_permission_level,
        required_permission_level
      );
      return next();
    } else {
      console.log(
        "paso 5. Entra al else",
        user_permission_level,
        required_permission_level
      );
      return res
        .status(403)
        .send({ error: "You don't have access to this content." });
    }
  };
};
