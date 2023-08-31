import React, { createContext, useEffect, useState } from "react";
import ProductComponent from "../components/Product/ProductComponent";
import CartComponent from "../components/Cart/CartComponent";
import { API_URL } from "../constants/apiUrl";
import { headersInfo } from "../utils/headerInfo";
export const HomeContext = createContext();
export default function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getMyCart = async () => {
      const response = await fetch(`${API_URL}/cart/my_cart`, {
        method: "GET",
        headers: headersInfo(),
      });
      const result = await response.json();
      const { data } = result;
      setCart([...data]);
    };
    getMyCart();
  }, []);
  useEffect(() => {
    const getAllProducts = async () => {
      const result = await fetch(`${API_URL}/products`);
      const { data } = await result.json();
      setProducts(data);
    };
    getAllProducts();
  }, []);
  const create = async (_id) => {
    const product = products.find((product) => product._id == _id);
    const response = await fetch(`${API_URL}/cart-products`, {
      method: "POST",
      headers: headersInfo(),
      body: JSON.stringify({ productId: _id, quantity: 1 }),
    });
    const result = await response.json();
    const { data } = result;
    data.product = product;
    setCart((prevState) => [...prevState, data]);
  };
  const update = async (index, { quantity }) => {
    cart[index].quantity = quantity;
    setCart([...cart]);
    await fetch(`${API_URL}/cart-products/${cart[index]?._id}`, {
      method: "PUT",
      headers: headersInfo(),
      body: JSON.stringify({ quantity }),
    });
  };
  const remove = async (_id) => {
    const index = cart.findIndex((item) => item?._id == _id);
    cart.splice(index, 1);
    setCart([...cart]);
    await fetch(`${API_URL}/cart-products/${_id}`, {
      headers: headersInfo(),
      method: "DELETE",
    });
  };
  return (
    <>
      <HomeContext.Provider value={{ cart, products, create, update, remove }}>
        <ProductComponent />
        <CartComponent />
      </HomeContext.Provider>
    </>
  );
}
