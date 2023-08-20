import { PRODUCT_KEY } from "../contains/key_name.js";
import { LOADING_SET_TIME_OUT } from "../contains/number_setTimeOut.js";
import { cart as cart__state } from "../global/state.js";

import { loading } from "./loading.helper.js";
import { saveToLocalStorage } from "./storage.helper.js";
import ProductService from "./../services/ProductServices.js";
export const updateQuantity = (index_product, index_spin, { type, value }) => {
  // type == 0 => (-); type == 1 (+) else = type.value
  const quantity = cart__state[index_product]?.quantity;
  let payload = type === 0 ? quantity - 1 : type === 1 ? quantity + 1 : value;
  if (payload <= 1) {
    payload = 1;
  }
  const { cart } = ProductService.findOneAndUpdate(index_product, payload);
  saveToLocalStorage(PRODUCT_KEY, cart);
  loading(
    [
      [`sub__spin-${index_spin}`, `show__fa-spin-item`],
      [`fa-spin-item-${index_spin}`, `show__fa-spin-item`],
    ],
    { status: true }
  );
  setTimeout(() => {
    show
    loading(
      [
        [`sub__spin-${index_spin}`, `show__fa-spin-item`],
        [`fa-spin-item-${index_spin}`, `show__fa-spin-item`],
      ],
      { status: false }
    );
  }, LOADING_SET_TIME_OUT);
};
