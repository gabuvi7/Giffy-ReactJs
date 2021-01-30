const User = require("../models/user.model.js");

//Retorna todos los usuarios:
exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error obteniendo los usuarios",
      });
    });
};

// Creacion de nuevos usuarios:

exports.create = (req, res) => {
  // Valido la peticion:
  if (!req.body) {
    return res.status(400).send({
      message: "Por favor llene todos los campos requeridos.",
    });
  }

  // Creo el usuario:
  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  });

  // Guardo usuario en la base
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al crear usuario.",
      });
    });
};

// Busco usuario por id:

exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "No se encontro el usuario con el id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No se encontro el usuario con el id " + req.params.id,
        });
      }

      return res.status(500).send({
        message:
          "Ocurrio un error al obtener el usuario con id " + req.params.id,
      });
    });
};

// Actualizo el usuario por id

exports.update = (req, res) => {
  //Valido la peticion
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Por favor, llene los campos requeridos" });
  }

  // Busco el usuario y lo actualizo

  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
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

