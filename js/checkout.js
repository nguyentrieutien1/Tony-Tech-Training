import { totalPrice } from "../helpers/total_price.js";
export const checkout = () => {
  const total__price = document.querySelector(".total__price");
  const sub__total = document.querySelector(".sub__total");
  sub__total ? (sub__total.textContent = `$ ${totalPrice()}`) : null;
  total__price ? (total__price.textContent = `$ ${totalPrice()}`) : null;
};
checkout();
