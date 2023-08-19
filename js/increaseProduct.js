import { PRODUCT_KEY } from "../contains/key_name.js";
import { cart } from "../global/state.js";
import { updateQuantity } from "../helpers/updateQuantity.helper.js";
import { toInt } from "../utils/coverToInt.js";
export const handleIncrement = () => {
  const increase_quantity_buttons = document.querySelectorAll(
    ".increase__product--btn"
  );
  increase_quantity_buttons.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const index = cart?.findIndex(
        (product) => toInt(product?.id) == toInt(id)
      );
      updateQuantity(index, i, { type: 1 });
    });
  });
};
