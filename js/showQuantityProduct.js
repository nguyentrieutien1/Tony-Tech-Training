import cartService from "../services/cart.service.js";

export const showQuantityProduct = async () => {
  const quantityElement = document.querySelector(".cart__icon .amount");
  const products = await cartService.getAll();
  const quantities = products?.reduce((prevItem, currentIem) => {
    prevItem += currentIem?.quantity;
    return prevItem;
  }, 0);
  quantityElement.textContent = quantities;
};
