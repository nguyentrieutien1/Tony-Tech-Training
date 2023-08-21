import { LOADING_SET_TIME_OUT } from "../constants/number_setTimeOut.js";
import { loading } from "./loading.helper.js";
import { getCartItems } from "../UI-controllers/cart.js";
import cartService from "../services/cart.service.js";
export const updateQuantity = async (id, index_spin, { type, value }) => {
  const product = await cartService.findOneById(id);
  const quantity = product?.quantity;
  let payload = type === 0 ? quantity - 1 : type === 1 ? quantity + 1 : value;
  if (payload <= 1) {
    payload = 1;
  }
  await cartService.findOneAndUpdate(id, payload);
  loading(
    [
      [`sub__spin-${index_spin}`, `show__fa-spin-item`],
      [`fa-spin-item-${index_spin}`, `show__fa-spin-item`],
    ],
    { status: true }
  );
  setTimeout(() => {
    getCartItems();
    loading(
      [
        [`sub__spin-${index_spin}`, `show__fa-spin-item`],
        [`fa-spin-item-${index_spin}`, `show__fa-spin-item`],
      ],
      { status: false }
    );
  }, LOADING_SET_TIME_OUT);
};
