import mongoose from "mongoose";
import { CartProductsDTO } from "../../types/cart-products.type";
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
const CartProducts = mongoose.model<CartProductsDTO>(
  "CartProduct",
  cartProductSchema
);
export { CartProducts };
