const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Please add a username"] },
    password: { type: String, required: [true, "Please add a password"] },
    favorites: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
    savedForm: { type: Object, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
