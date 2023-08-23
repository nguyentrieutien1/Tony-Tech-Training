import { LINK } from "../constants/url_link.js";
import { cartState } from "../global/state.js";
class Cart {
  findOneAndUpdate = async (index, payload) => {
    await fetch(`${LINK}/cart/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: payload }),
    });
  };

  findOneAndDelete = async (index) => {
    await fetch(`${LINK}/cart/${index}`, {
      method: "DELETE",
    });
  };

  getAll = async () => {
    const result = await fetch(`${LINK}/cart`);
    const { metadata } = await result.json();
    return metadata;
  };

  createOrUpdte = async (cart_id) => {
    try {
      if (cartState.length === 0) {
        await fetch(`${LINK}/cart`, {
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
          await fetch(`${LINK}/cart/${cart_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity }),
          });
        } else {
          cartState.push({ id: cart_id, quantity: 1 });
          await fetch(`${LINK}/cart`, {
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
    const result = await fetch(`${LINK}/cart/${cart_id}`);
    return await result.json();
  };
}
export default new Cart();
