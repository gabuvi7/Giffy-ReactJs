const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
