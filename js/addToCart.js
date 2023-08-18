import { getFromLocalStorage, saveToLocalStorage } from "../helpers/storage.js";
import { toInt } from "../utils/coverToInt.js";
import {
  LOADING_SET_TIME_OUT,
  FETCH_DATA_TIME_OUT,
} from "../contains/number_setTimeOut.js";
import { PRODUCT_NAME } from "../contains/key_name.js";
import { showCart } from "./cart.js";
import { checkout } from "./checkout.js";
import { totalPrice } from "../helpers/total_price.js";
import { findProductById } from "./findProductById.js";
import { showQuantityProduct } from "./showQuantityProduct.js";
import { deleteProduct } from "./deleteProduct.js";

export const handleAddToCart = () => {
  setTimeout(() => {
    const products = getFromLocalStorage(PRODUCT_NAME) || [];
    const shopping_btns = document.querySelectorAll(".fa-cart-shopping");
    const modal__container = document.querySelector(".modal__container");
    const modal__checkout = document.querySelector(".modal__checkout--total");
    const modal__content = document.querySelector(".modal__content");
    const modal__body = document.querySelector(".modal__body");
    shopping_btns.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        console.log(1);
        const spin = document.querySelector(`.fa-spin-${index}`);
        const image = document.querySelector(`.img-item-${index}`);
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
          deleteProduct();
          checkout();
          showQuantityProduct();
          modal__container.classList.add("show__modal");
          spin.style.display = "none";
          modal__checkout.innerHTML = `
							Subtotal: $ ${totalPrice({ id: product_id })}
						`;
          modal__content.innerHTML = findProductById(product_id);
          modal__body.classList.add("show__modal--body");
        }, LOADING_SET_TIME_OUT);
      });
    });
  }, FETCH_DATA_TIME_OUT);
};
