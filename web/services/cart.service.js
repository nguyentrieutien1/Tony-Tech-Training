import { API_URL } from "../constants/apiUrl.js";
import { cartState, productState } from "../global/state.js";
import { headersInfo } from "../utils/headerInfo.js";
class Cart {
  findOneAndUpdate = async (index, payload) => {
    await fetch(`${API_URL}/cart-products/${index}`, {
      method: "PUT",
      headers: headersInfo(),
      body: JSON.stringify({ quantity: payload }),
    });
  };

  findOneAndDelete = async (index) => {
    await fetch(`${API_URL}/cart-products/${index}`, {
      headers: headersInfo(),
      method: "DELETE",
    });
  };

  getAll = async () => {
    const result = await fetch(`${API_URL}/cart/my_cart`, {
      method: "GET",
      headers: headersInfo(),
    });
    const { data } = await result.json();
    return data;
  };
  createOrUpdte = async (cartId) => {
    const cartItem = productState.find((product) => product._id == cartId);
    try {
      if (cartState.length === 0) {
        await fetch(`${API_URL}/cart-products`, {
          method: "POST",
          headers: headersInfo(),
          body: JSON.stringify({ productId: cartId, quantity: 1 }),
        });
        cartState.push({ quantity: 1, product: cartItem });
      } else {
        const index = cartState.findIndex((p) => p?.product._id == cartId);
        if (index > -1) {
          const quantity = cartState[index].quantity + 1;
          cartState[index].quantity = quantity;
          await fetch(`${API_URL}/cart-products/${cartId}`, {
            method: "PUT",
            headers: headersInfo(),
            body: JSON.stringify({ quantity }),
          });
        } else {
          await fetch(`${API_URL}/cart-products`, {
            method: "POST",
            headers: headersInfo(),
            body: JSON.stringify({ productId: cartId, quantity: 1 }),
          });
          cartState.push({ quantity: 1, product: cartItem });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  findOneById = async (cartId) => {
    const result = await fetch(`${API_URL}/cart/${cartId}`);
    return await result.json();
  };
}
export default new Cart();
