import { updateQuantity } from "../helpers/updateQuantity.helper.js";
export const updateProduct = async (buttonList, cart) => {
  buttonList.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const type = this.getAttribute("data-type");
      updateQuantity(id, { type }, cart);
    });
  });
};
