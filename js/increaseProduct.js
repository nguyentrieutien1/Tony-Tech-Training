import { PRODUCT_NAME } from "../contains/key_name.js";
import { getFromLocalStorage, saveToLocalStorage } from "../helpers/storage.js";
import { toInt } from "../utils/coverToInt.js";
import { handleAddToCart } from "./addToCart.js";
import { showCart } from "./cart.js";

export const handleIncrement = () => {
  const increase_quantity_buttons = document.querySelectorAll(
    ".increase__product--btn"
  );
  console.log(increase_quantity_buttons);
  increase_quantity_buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      let products = getFromLocalStorage(PRODUCT_NAME);
      const index = products.findIndex(
        (product) => toInt(product.id) == toInt(id)
      );
      products[index].quantity = products[index].quantity + 1;
      saveToLocalStorage(PRODUCT_NAME, products);
      showCart();
      handleAddToCart();
    });
  });
};
handleIncrement();
