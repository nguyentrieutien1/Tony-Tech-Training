import { updateProduct } from "./updateProduct.js";
export const clickToUpdate = () => {
  const update_quantity_buttons = document.querySelectorAll(
    ".update__quantity--btn"
  );
  updateProduct(update_quantity_buttons, 0);
};
