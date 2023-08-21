import { updateQuantity } from "../helpers/updateQuantity.helper.js";
export const updateProduct = async (buttonList, type, value) => {
  buttonList.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      updateQuantity(id, i, { type, value });
    });
  });
};
