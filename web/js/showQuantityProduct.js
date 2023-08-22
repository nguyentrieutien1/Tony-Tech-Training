export const showQuantityProduct = async (cart) => {
  const quantityElement = document.querySelector(".cart__icon .amount");
  const quantities = cart?.reduce((prevItem, currentIem) => {
    prevItem += currentIem?.quantity;
    return prevItem;
  }, 0);
  quantityElement.textContent = quantities;
};
