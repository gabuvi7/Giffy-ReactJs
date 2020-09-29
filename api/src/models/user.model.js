const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
    username: String,
    password: String,
    permissionLevel: Number,
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//module.exports = mongoose.model("Users", userSchema);

const User = mongoose.model("Users", userSchema);

module.exports = User;
