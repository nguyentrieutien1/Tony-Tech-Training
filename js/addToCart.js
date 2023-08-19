import { saveToLocalStorage } from "../helpers/storage.helper.js";
import { toInt } from "../utils/coverToInt.js";
import { LOADING_SET_TIME_OUT } from "../contains/number_setTimeOut.js";
import { PRODUCT_KEY } from "../contains/key_name.js";
import { showCart } from "./cart.js";
import { checkout } from "./checkout.js";
import { totalPrice } from "../helpers/total_price.helper.js";
import { findProductById } from "./showProductById.js";
import { cart } from "../global/state.js";

export const handleAddToCart = () => {
  const shopping_btns = document.querySelectorAll(".fa-cart-shopping");
  const modal__container = document.querySelector(".modal__container");
  const modal__checkout = document.querySelector(".modal__checkout--total");
  const modal__content = document.querySelector(".modal__content");
  const modal__body = document.querySelector(".modal__body");
  shopping_btns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const spin = document.querySelector(`.fa-spin-${index}`);
      spin.style.display = "block";
      setTimeout(() => {
        const product_id = toInt(this?.getAttribute("data-id"));
        const product = cart?.find(
          (product) => toInt(product?.id) == toInt(product_id)
        );
        if (product) {
          product.quantity += 1;
        } else {
          cart?.push({ id: product_id, quantity: 1 });
        }
        saveToLocalStorage(PRODUCT_KEY, cart);
        showCart();
        checkout();
        modal__container?.classList?.add("show__modal");
        spin.style.display = "none";
        modal__checkout.innerHTML = `
							Subtotal: $ ${totalPrice({ id: product_id })}
						`;
        modal__content.innerHTML = findProductById(product_id);
        modal__body.classList?.add("show__modal--body");
      }, LOADING_SET_TIME_OUT);
    });
  });
};
