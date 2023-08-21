import { updateProduct } from "./updateProduct.js";
export const handleDecrement = () => {
  const increase_quantity_buttons = document.querySelectorAll(
    ".decrease__product--btn"
  );
  updateProduct(increase_quantity_buttons, 0);
};
