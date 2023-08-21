import { updateQuantity } from "../helpers/updateQuantity.helper.js";
import { toInt } from "../utils/covertToInt.js";
export const handleUpdateQuantity = () => {
  const increase_quantity_buttons = document.querySelectorAll(
    ".update__quantity-input"
  );
  increase_quantity_buttons.forEach((btn) => {
    btn.addEventListener("blur", function () {
      const id = this.getAttribute("data-id");
      const value = toInt(this.value);
      updateQuantity(id, { type: 2, value });
    });
  });
};
