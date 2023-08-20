import { cart } from "../global/state.js";
class Cart {
  findOneAndUpdate = (index, payload) => {
    cart[index].quantity = payload;
    return { cart };
  };
  findOneAndDelete = (index) => {
    cart?.splice(index, 1);
    return { cart };
  };
}
export default new Cart();
