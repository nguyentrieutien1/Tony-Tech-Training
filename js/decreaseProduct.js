import { updateCartItem } from "../UI-controllers/cart.js";
import { cart } from "../global/state.js";
import { toInt } from "../utils/covertToInt.js";
export const handleDecrement = () => {
  const increase_quantity_buttons = document.querySelectorAll(
    ".decrease__product--btn"
  );
  increase_quantity_buttons.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const index = cart.findIndex(
        (product) => toInt(product?.id) == toInt(id)
      );
      updateCartItem(index, i, { type: 0 });
    });
  });
};
