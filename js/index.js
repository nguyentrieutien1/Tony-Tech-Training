import { products } from "../data/products.js";
import { handleAddToCart } from "./addToCart.js";
import { showAllProducts } from "./showProducts.js";
import "./cart.js";
import "./increaseProduct.js";
import "./decreaseProduct.js";
import "./updateQuantity.js";
import "./checkout.js";
import "./showQuantityProduct.js";
import "./deleteProduct.js";
// get DOM
const startApp = () => {
  // SHOW ALL PRODUCT
  showAllProducts();
  // HANDLE ADD TO CART
  handleAddToCart();
};

startApp();
