import { getFromLocalStorage, saveToLocalStorage } from "../helpers/storage.js";
import { toInt } from "../utils/coverToInt.js";
import {
  LOADING_SET_TIME_OUT,
  NUMBER_SET_TIME_OUT,
} from "../contains/number__setTimeOut.js";
import { PRODUCT_NAME } from "../contains/key_name.js";
import { showCart } from "./cart.js";

export const handleAddToCart = () => {
  setTimeout(() => {
    const products = getFromLocalStorage(PRODUCT_NAME) || [];
    const shopping_btns = document.querySelectorAll(".fa-cart-shopping");
    shopping_btns.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        const spin = document.querySelector(`.fa-spin-${index}`);
        spin.style.display = "block";
        setTimeout(() => {
          const product_id = toInt(this.getAttribute("data-id"));
          const product = products.find(
            (product) => toInt(product.id) == toInt(product_id)
          );
          if (product) {
            product.quantity += 1;
          } else {
            products.push({ id: product_id, quantity: 1 });
          }
          saveToLocalStorage(PRODUCT_NAME, products);
          showCart();
          spin.style.display = "none";
        }, LOADING_SET_TIME_OUT);
      });
    });
  }, NUMBER_SET_TIME_OUT);
};
