import { updateProduct } from "./updateProduct.js";
export const handleIncrement = () => {
  const increase_quantity_buttons = document.querySelectorAll(
    ".increase__product--btn"
  );
  updateProduct(increase_quantity_buttons, 1);
};
