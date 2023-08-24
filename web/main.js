import { showAllProducts } from "./UI-controllers/product.controller.js";
import { initCartState, initProductState } from "./global/state.js";
import "./UI-controllers/cart.controller.js";
const startApp = async () => {
  //Initial Product  State
  await initProductState();
  //Initial Cart  State
  await initCartState();
  // Show All Product
  showAllProducts();
};
startApp();
