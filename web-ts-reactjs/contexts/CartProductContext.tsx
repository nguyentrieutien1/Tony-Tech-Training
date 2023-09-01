import { CartProductsContextType } from "@/types/productCartContextType.type";
import { CartProductsProviderProps } from "@/types/productCartProviderProps.type";
import { ProductDTO } from "@/types/products.type";
import React, { createContext, useEffect, useState } from "react";
import { API_URL } from "@/constants/apiUrl";
import { CartDTO } from "@/types/cart.type";
import { headersInfo } from "@/utils/headerInfo";
const CartProductsContext = createContext<CartProductsContextType>(
  {} as CartProductsContextType
);
const CartProductsProvider = ({ children }: CartProductsProviderProps) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [cart, setCart] = useState<CartDTO[]>([]);
  const [isToggleCart, setIsToggleCart] = useState<boolean>(false);
  useEffect(() => {
    getAllCartItem().then((data) => {
      setCart([...data]);
    });
    getAllProductItem().then((productItem) => {
      setProducts(productItem);
    });
  }, []);
  const getAllProductItem = async () => {
    const result = await fetch(`${API_URL}/products`);
    const { data }: { data: ProductDTO[] } = await result.json();
    return data;
  };
  const getAllCartItem = async () => {
    const response = await fetch(`${API_URL}/cart/my_cart`, {
      method: "GET",
      headers: headersInfo(),
    });
    const result = await response.json();
    const { data }: { data: CartDTO[] } = result;
    return data;
  };
  const create = async (item: CartDTO): Promise<CartDTO> => {
    const response = await fetch(`${API_URL}/cart-products`, {
      method: "POST",
      headers: headersInfo(),
      body: JSON.stringify(item),
    });
    const { data } = await response.json();
    return data;
  };
  const update = async (_id: string, payload: CartDTO): Promise<void> => {
    await fetch(`${API_URL}/cart-products/${_id}`, {
      method: "PUT",
      headers: headersInfo(),
      body: JSON.stringify(payload),
    });
  };
  const remove = async (_id: string): Promise<void> => {
    await fetch(`${API_URL}/cart-products/${_id}`, {
      headers: headersInfo(),
      method: "DELETE",
    });
  };
  return (
    <CartProductsContext.Provider
      value={{
        products,
        cart,
        isToggleCart,
        setIsToggleCart,
        setCart,
        create,
        update,
        remove,
        setProducts,
      }}
    >
      {children}
    </CartProductsContext.Provider>
  );
};

export { CartProductsContext, CartProductsProvider };
