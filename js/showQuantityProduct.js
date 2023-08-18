import { PRODUCT_NAME } from "../contains/key_name.js";
import { getFromLocalStorage } from "../helpers/storage.js";

export const showQuantityProduct = () => {
  const quantityElement = document.querySelector(".cart__icon .amount");
  const products = getFromLocalStorage(PRODUCT_NAME) || [];
  const quantities = products?.reduce((prevItem, currentIem) => {
    prevItem += currentIem.quantity;
    return prevItem;
  }, 0);
  quantityElement.textContent = quantities;
};
showQuantityProduct();
