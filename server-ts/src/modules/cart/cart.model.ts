import mongoose from "mongoose";
import { CartDTO } from "../../types/cart.type";
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
//Export the model
const Cart = mongoose.model<CartDTO>("Cart", cartSchema);
export { Cart };
