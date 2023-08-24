import { API_URL } from "../constants/apiUrl.js";
import { cartState } from "../global/state.js";
class Cart {
  findOneAndUpdate = async (index, payload) => {
    await fetch(`${API_URL}/cart/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: payload }),
    });
  };

  findOneAndDelete = async (index) => {
    await fetch(`${API_URL}/cart/${index}`, {
      method: "DELETE",
    });
  };

  getAll = async () => {
    const result = await fetch(`${API_URL}/cart`);
    const { data } = await result.json();
    return data;
  };

  createOrUpdte = async (cart_id) => {
    try {
      if (cartState.length === 0) {
        await fetch(`${API_URL}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: cart_id, quantity: 1 }),
        });
        cartState.push({ id: cart_id, quantity: 1 });
      } else {
        const index = cartState.findIndex((p) => p.id == cart_id);
        if (index > -1) {
          const quantity = cartState[index].quantity + 1;
          cartState[index].quantity = quantity;
          await fetch(`${API_URL}/cart/${cart_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity }),
          });
        } else {
          cartState.push({ id: cart_id, quantity: 1 });
          await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: cart_id, quantity: 1 }),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  findOneById = async (cart_id) => {
    const result = await fetch(`${API_URL}/cart/${cart_id}`);
    return await result.json();
  };
}
export default new Cart();
