  const mongoose = require("mongoose"); // Erase if already required
  const tokenSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tham chiếu tới collection 'User'
    },
    accessToken: {
      type: String,
      unique: true,
      require: true,
    },
    publicKey: {
      type: String,
      unique: true,
      require: true,
    },
    refreshToken: {
      type: String,
    },
  });

  const Token = mongoose.model("Token", tokenSchema);
  module.exports = { Token };
