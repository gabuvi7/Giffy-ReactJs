const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const jwt = require("jsonwebtoken");
const config = "./config/config.js";
const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/middlewareRoutes.routes");
const app = express();
const fs = require("fs");
const middleware = require("./src/middleware/middleware.js");
const key = require("./config/env.config").jwt_secret;

const port = process.env.PORT || 8080;

app.set("key", config.key);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to the db.
mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
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

app.listen(port, () => {
  console.log(`node server is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/jwt", (req, res) => {
  let privateKey = fs.readFileSync(key, "utf8");
  let token = jwt.sign({ body: "stuff" }, privateKey, { algorithm: "HS256" });
  res.send(token);
});

app.get("/auth", middleware.isAuthorized, (req, res) => {
  res.json({ message: "Authorized" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
