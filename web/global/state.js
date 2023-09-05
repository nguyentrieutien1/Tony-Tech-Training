import cartService from "../services/cart.service.js";
import productService from "../services/product.service.js";

let cartState = [];
let productState = [];
export const initCartState = async () => {
  cartState = await cartService.getAll();
};
export const initProductState = async () => {
  productState = await productService.getAllProducts();
};
export { cartState, productState };
