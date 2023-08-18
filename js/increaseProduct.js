import { PRODUCT_NAME } from "../contains/key_name.js";
import { LOADING_SET_TIME_OUT } from "../contains/number_setTimeOut.js";
import { getFromLocalStorage, saveToLocalStorage } from "../helpers/storage.js";
import { toInt } from "../utils/coverToInt.js";
import { handleAddToCart } from "./addToCart.js";
import { showCart } from "./cart.js";
import { checkout } from "./checkout.js";
import { showQuantityProduct } from "./showQuantityProduct.js";

export const handleIncrement = () => {
  const increase_quantity_buttons = document.querySelectorAll(
    ".increase__product--btn"
  );
  console.log(increase_quantity_buttons);
  increase_quantity_buttons.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      let products = getFromLocalStorage(PRODUCT_NAME);
      const index = products.findIndex(
        (product) => toInt(product.id) == toInt(id)
      );

      products[index].quantity = products[index].quantity + 1;
      saveToLocalStorage(PRODUCT_NAME, products);
      const sub__spin = document.querySelector(`.sub__spin-${i}`);
      const fa__spin__item = document.querySelector(`.fa-spin-item-${i}`);
      sub__spin.classList.add("show__fa-spin-item");
      fa__spin__item.classList.add("show__fa-spin-item");
      setTimeout(() => {
        showCart();
        handleAddToCart();
        checkout();
        showQuantityProduct();

        sub__spin.classList.add("show__fa-spin-item");
        fa__spin__item.classList.add("show__fa-spin-item");
      }, LOADING_SET_TIME_OUT);
    });
  });
};
handleIncrement();
