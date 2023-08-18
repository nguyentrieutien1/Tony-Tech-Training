import { totalPrice } from "../helpers/total_price.js";
export const checkout = () => {
  const total__price = document.querySelector(".total__price");
  const sub__total = document.querySelector(".sub__total");
  sub__total.textContent = `$ ${totalPrice()}`;
  total__price.textContent = `$ ${totalPrice()}`;
};
checkout();
