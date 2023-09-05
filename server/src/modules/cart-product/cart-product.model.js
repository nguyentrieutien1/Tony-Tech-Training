const mongoose = require("mongoose");
const cartProductSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
});
//Export the model
const CartProduct = mongoose.model("CartProduct", cartProductSchema);
module.exports = { CartProduct };
