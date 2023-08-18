import { PRODUCT_NAME } from "../contains/key_name.js";
import { LOADING_SET_TIME_OUT } from "../contains/number__setTimeOut.js";
import { getFromLocalStorage, saveToLocalStorage } from "../helpers/storage.js";
import { toInt } from "../utils/coverToInt.js";
import { showCart } from "./cart.js";
import { checkout } from "./checkout.js";
import { showQuantityProduct } from "./showQuantityProduct.js";

export const deleteProduct = () => {
  const del__btns = document.querySelectorAll(".cart__item--delete-btn");

  del__btns.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const products = getFromLocalStorage(PRODUCT_NAME);
      const index = products.findIndex(
        (product) => toInt(product?.id) == toInt(id)
      );
      products.splice(index, 1);
      const sub__spin = document.querySelector(`.sub__spin-${i}`);
      const fa__spin__item = document.querySelector(`.fa-spin-item-${i}`);
      sub__spin.classList.add("show__fa-spin-item");
      fa__spin__item.classList.add("show__fa-spin-item");
      setTimeout(() => {
        saveToLocalStorage(PRODUCT_NAME, products);
        showCart();
        checkout();
        showQuantityProduct();
        sub__spin.classList.remove("show__fa-spin-item");
        fa__spin__item.classList.remove("show__fa-spin-item");
      }, LOADING_SET_TIME_OUT);
    });
  });
};
deleteProduct();
