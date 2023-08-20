import { cart } from "../global/state.js";
class Product {
  findOneAndUpdate = (index, payload) => {
    cart[index].quantity = payload;
    return { cart };
  };
  findOneAndDelete = (index) => {
    cart?.splice(index, 1);
    return { cart };
  };
}
export default new Product();
