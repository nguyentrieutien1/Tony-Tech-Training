import { showAllProducts } from "../UI-controllers/product.js";
import { initCartState, initProductState } from "../global/state.js";
import "./../UI-controllers/cart.js";
const startApp = async () => {
  //Initial Product  State
  await initProductState();
  //Initial Cart  State
  await initCartState();
  // Show All Product
  showAllProducts();
};
startApp();
