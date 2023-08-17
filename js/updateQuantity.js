import { PRODUCT_NAME } from "../contains/key_name.js";
import { getFromLocalStorage, saveToLocalStorage } from "../helpers/storage.js";
import { toInt } from "../utils/coverToInt.js";
import { showCart } from "./cart.js";

export const handleUpdateQuantity = () => {
  const increase_quantity_buttons = document.querySelectorAll(
    ".update__quantity-input"
  );
  increase_quantity_buttons.forEach((btn) => {
    btn.addEventListener("blur", function () {
      const id = this.getAttribute("data-id");
      const value = toInt(this.value);
      let products = getFromLocalStorage(PRODUCT_NAME);
      const index = products.findIndex(
        (product) => toInt(product.id) == toInt(id)
      );
      products[index].quantity = value;
      saveToLocalStorage(PRODUCT_NAME, products);
      showCart();
    });
  });
};
handleUpdateQuantity();
