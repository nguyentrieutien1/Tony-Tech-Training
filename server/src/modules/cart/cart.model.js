const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
//Export the model
const Cart = mongoose.model("Cart", cartSchema);
module.exports = { Cart };
