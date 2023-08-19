import { cart } from "../global/state.js";
import { updateQuantity } from "../helpers/updateQuantity.helper.js";
import { toInt } from "../utils/coverToInt.js";
export const handleUpdateQuantity = () => {
  const increase_quantity_buttons = document.querySelectorAll(
    ".update__quantity-input"
  );
  increase_quantity_buttons.forEach((btn, i) => {
    btn.addEventListener("blur", function () {
      const id = this.getAttribute("data-id");
      const value = toInt(this.value);
      const index = cart.findIndex(
        (product) => toInt(product?.id) == toInt(id)
      );
      updateQuantity(index, i, { type: 2, value });
    });
  });
};
