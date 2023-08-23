import { LOADING_SET_TIME_OUT } from "../constants/number_setTimeOut.js";
import { loading } from "./loading.helper.js";
import { getCartItems } from "../UI-controllers/cart.js";
import cartService from "../services/cart.service.js";
import { cartState } from "../global/state.js";
export const updateQuantity = async (id, { type, value }, cart) => {
  const product = cart.find((cart) => cart.id == id);
  const index_spin = cart.findIndex((p) => p.id == id);
  const quantity = product?.quantity;
  let payload = type == 0 ? quantity - 1 : type == 1 ? quantity + 1 : value;
  if (payload <= 1) {
    payload = 1;
  }
  const index = cart.findIndex((cart) => cart.id == id);
  cartState[index].quantity = payload;

  loading(
    [
      [`sub__spin-${index_spin}`, `show__fa-spin-item`],
      [`fa-spin-item-${index_spin}`, `show__fa-spin-item`],
    ],
    { status: true }
  );
  await cartService.findOneAndUpdate(id, payload);
  getCartItems();
  loading(
    [
      [`sub__spin-${index_spin}`, `show__fa-spin-item`],
      [`fa-spin-item-${index_spin}`, `show__fa-spin-item`],
    ],
    { status: false }
  );
};
