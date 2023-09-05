import {
  CREATE_CART_ITEM,
  DELETE_CART_ITEM,
  GET_ALL_CART_PRODUCTS,
  UPDATE_CART_ITEM,
} from "@/types/action.type";
import { CartProductsDTO } from "@/types/cart.type";

const initialState: CartProductsDTO[] = [];
const cartProductsReducer = (
  state: CartProductsDTO[] = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CART_PRODUCTS:
      state = [...payload];
      return [...state];

    case UPDATE_CART_ITEM:
      const { cartId, data }: { cartId: string; data: CartProductsDTO } =
        payload;
      const { quantity }: CartProductsDTO = data;
      state = state.map((cartItem) => {
        if (cartItem._id == cartId) {
          cartItem.quantity = quantity;
        }
        return cartItem;
      });
      return [...state];

    case CREATE_CART_ITEM:
      return [...state.concat(payload)];

    case DELETE_CART_ITEM:
      const id = payload.cartId;
      return [...state.filter((item: CartProductsDTO) => item._id != id)];

    default:
      return [...state];
  }
};
export { cartProductsReducer };
