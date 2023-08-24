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

  createOrUpdte = async (cartid) => {
    console.log(cartid);
    try {
      if (cartState.length === 0) {
        await fetch(`${API_URL}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: cartid, quantity: 1 }),
        });
        cartState.push({ id: cartid, quantity: 1 });
      } else {
        const index = cartState.findIndex((p) => p.id == cartid);
        if (index > -1) {
          const quantity = cartState[index].quantity + 1;
          cartState[index].quantity = quantity;
          await fetch(`${API_URL}/cart/${cartid}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity }),
          });
        } else {
          cartState.push({ id: cartid, quantity: 1 });
          await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: cartid, quantity: 1 }),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  findOneById = async (cartid) => {
    const result = await fetch(`${API_URL}/cart/${cartid}`);
    return await result.json();
  };
}
export default new Cart();
