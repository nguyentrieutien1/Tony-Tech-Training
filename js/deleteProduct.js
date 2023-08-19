import { PRODUCT_KEY } from "../contains/key_name.js";
import { LOADING_SET_TIME_OUT } from "../contains/number_setTimeOut.js";
import { cart } from "../global/state.js";
import { saveToLocalStorage } from "../helpers/storage.helper.js";
import { toInt } from "../utils/coverToInt.js";
import { showCart } from "./cart.js";
export const deleteProduct = () => {
  const del__btns = document.querySelectorAll(".cart__item--delete-btn");

  del__btns.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const index = cart?.findIndex(
        (product) => toInt(product?.id) == toInt(id)
      );
      cart?.splice(index, 1);
      const sub__spin = document?.querySelector(`.sub__spin-${i}`);
      const fa__spin__item = document.querySelector(`.fa-spin-item-${i}`);
      sub__spin?.classList?.add("show__fa-spin-item");
      fa__spin__item?.classList?.add("show__fa-spin-item");
      setTimeout(() => {
        saveToLocalStorage(PRODUCT_KEY, cart);
        showCart();
        sub__spin?.classList?.remove("show__fa-spin-item");
        fa__spin__item?.classList?.remove("show__fa-spin-item");
      }, LOADING_SET_TIME_OUT);
    });
  });
};
