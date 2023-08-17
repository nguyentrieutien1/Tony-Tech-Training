import { getFromLocalStorage, saveToLocalStorage } from "../helpers/storage.js";
import { toInt } from "../utils/coverToInt.js";
import { NUMBER_SET_TIME_OUT } from "../contains/number__setTimeOut.js";
import { PRODUCT_NAME } from "../contains/key_name.js";
import { showCart } from "./cart.js";
import { handleIncrement } from "./increaseProduct.js";

export const handleAddToCart = () => {
  setTimeout(() => {
    const products = getFromLocalStorage(PRODUCT_NAME) || [];
    console.log(products);
    const shopping_btns = document.querySelectorAll(".fa-cart-shopping");
    shopping_btns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const product_id = toInt(this.getAttribute("data-id"));
        //  Check exits product in db ?
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
      });
    });
  }, NUMBER_SET_TIME_OUT);
};
