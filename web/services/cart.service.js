import { LINK } from "../constants/url_link.js";
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
    const cart = await result.json();
    return cart;
  };
  createOrUpdte = async (cart_id) => {
    try {
      const fetchProduct = await fetch(`${LINK}/cart`);
      const products = await fetchProduct.json();
      if (products.length === 0) {
        await fetch(`${LINK}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: cart_id, quantity: 1 }),
        });
      } else {
        const product = products.find((p) => p.id == cart_id);
        if (product) {
          const quantity = product.quantity + 1;
          await fetch(`${LINK}/cart/${cart_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity }),
          });
        } else {
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
