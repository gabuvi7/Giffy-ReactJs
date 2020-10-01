const User = require("../models/user.model.js");
const crypto = require("crypto");

//Retorna todos los usuarios:
exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(500, {
        message: err.message || "Ocurrio un error obteniendo los usuarios",
      });
    });
};

// Creacion de nuevos usuarios:

exports.create = (req, res) => {
  // Valido la peticion:
  if (!req.body) {
    return res.send(400, {
      message: "Por favor llene todos los campos requeridos.",
    });
  }

  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  let pwd = salt + "$" + hash;
  req.body.password = pwd;

  // Creo el usuario:
  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    permissionLevel: req.body.permissionLevel,
  });

  // Guardo usuario en la base
  user
    .save()
    .then((data) => {
      res.status(201).send([{ id: data._id }, { data }]);
    })
    .catch((err) => {
      res.send(500, {
        message: err.message || "Ocurrio un error al crear usuario.",
      });
    });
};

// Busco usuario por id:

exports.findOne = (req, res) => {
  console.log("Entro al findOne");
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.send(404, {
          message: "No se encontro el usuario con el id " + req.params.id,
        });
      }
      console.log("Entro al .then de findById: ");
      user = user.toJSON();
      delete user.password;
      delete user.__v;
      console.log("Ya borre la pwd: ", user);
      if (user.password) {
        return res
          .status(500)
          .send(
            "Ocurrio un error, intente mas tarde. Si el error persiste, contacte al servicio técnico."
          );
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.send(404, {
          message: "No se encontro el usuario con el id " + req.params.id,
        });
      }

      return res.send(500, {
        message:
          "Ocurrio un error al obtener el usuario con id " + req.params.id,
      });
    });
};

// Actualizo el usuario por id

exports.update = (req, res) => {
  try {
    //Valido la peticion
    if (!req.body) {
      return res.send(400, {
        message: "Por favor, llene los campos requeridos",
      });
    }

    // Encripto la contraseña
    if (req.body.password) {
      console.log("Entra al req.body.pwd: ", req.body.password);
      let salt = crypto.randomBytes(16).toString("base64");
      let hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      let pwd = salt + "$" + hash;
      console.log("Password hasheada: ", pwd);
      req.body.password = pwd;
    }

    console.log("Sigue hasheada la pwd? : ", req.body.password);

    User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        permissionLevel: req.body.permissionLevel,
      },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "Usuario no encontrado con el id " + req.params.id,
          });
        }
        res.send(user);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Usuario no encontrado con el id " + req.params.id,
          });
        }

        return res.status(500).send({
          message: "Error al actualizar el usuario por id " + req.params.id,
        });
      });
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Ocurrio un error. ", errormsj: err.message });
  }
};

// Borrar usuario por el id especificado en la petición

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Usuario no encontrado por id " + req.params.id,
        });
      }

      res.send({ message: "Usuario borrado satisfactoriamente!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectsId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Usuario no encontrado por id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "No se puedo eliminar el usuario con el id " + req.params.id,
      });
    });
};

// Busco usuario por email

exports.findByEmail = (email) => {
  return User.find({ email: email });
};
