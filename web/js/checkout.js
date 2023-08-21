import { totalPrice } from "../helpers/total_price.helper.js";
export const checkout = async () => {
  const total = await totalPrice();
  const total__price = document.querySelector(".total__price");
  const sub__total = document.querySelector(".sub__total");
  sub__total ? (sub__total.textContent = `$ ${total}`) : null;
  total__price ? (total__price.textContent = `$ ${total}`) : null;
};
