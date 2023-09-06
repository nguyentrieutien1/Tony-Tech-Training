import { CartProductsApi } from "@/apis/cart-products.api";
import {
  CREATE_CART_ITEM,
  DELETE_CART_ITEM,
  GET_ALL_CART_PRODUCTS,
  UPDATE_CART_ITEM,
} from "@/types/action.type";
import { CartProductsDTO } from "@/types/cart.type";
import { Dispatch } from "redux";
class CartProductsAction {

  static getAllCartProducts = () => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const cartProducts: CartProductsDTO[] = await CartProductsApi.getAll();
        dispatch({ type: GET_ALL_CART_PRODUCTS, payload: cartProducts });
      } catch (error) {}
    };
  };


  static updateCartItem = (cartId: string, payload: CartProductsDTO) => {
    return async (dispatch: Dispatch) => {
      try {
        await CartProductsApi.update(cartId, payload);
        dispatch({
          type: UPDATE_CART_ITEM,
          payload: { cartId, data: payload },
        });
      } catch (error) {
        // DISPATCH ERROR TO REDUCER HERE
      }
    };
  };


  static createCartItem = (item: CartProductsDTO) => {
    return async (dispatch: Dispatch) => {
      try {
        const cartItem = await CartProductsApi.create(item);
        dispatch({
          type: CREATE_CART_ITEM,
          payload: cartItem,
        });
      } catch (error) {
        // DISPATCH ERROR TO REDUCER HERE
      }
    };
  };

  
  static removeCartItem = (cartId: string) => {
    return async (dispatch: Dispatch) => {
      try {
        await CartProductsApi.remove(cartId);
        dispatch({
          type: DELETE_CART_ITEM,
          payload: { cartId },
        });
      } catch (error) {
        // DISPATCH ERROR TO REDUCER HERE
      }
    };
  };
}
export { CartProductsAction };
