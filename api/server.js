const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const app = express();
const userRoutes = require("./src/routes/user.routes");

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Connecting to the db.

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Se conecto a la base");
  })
  .catch((err) => {
    console.log("No se pudo conectar a la base. ", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Hola bienvenidos a la api" });
});

app.listen(port, () => {
  console.log(`node server is listening on port ${port}`);
});

app.use("/api/users", userRoutes);
