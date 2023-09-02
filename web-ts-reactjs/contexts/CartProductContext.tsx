import React, { createContext, useEffect, useState } from "react";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import { CartProductsProviderProps } from "@/types/productCartProviderProps.type";
import { ProductsDTO } from "@/types/products.type";
import { CartProductsDTO } from "@/types/cart.type";
import { ProductsApi } from "@/apis/products.api";
import { CartProductsApi } from "@/apis/cartProducts.api";
const CartProductsContext = createContext<CartProductsContextType>(
  {} as CartProductsContextType
);
const CartProductsProvider = ({ children }: CartProductsProviderProps) => {
  const [products, setProducts] = useState<ProductsDTO[]>([]);
  const [cart, setCart] = useState<CartProductsDTO[]>([]);
  const [isToggleCart, setIsToggleCart] = useState<boolean>(false);

  const getAllProducts = async () => {
    const products = await ProductsApi.getAll();
    setProducts([...products]);
  };
  const getAllCartProducts = async () => {
    const cartProducts = await CartProductsApi.getAll();
    setCart([...cartProducts]);
  };
  const create = async (item: CartProductsDTO): Promise<CartProductsDTO> => {
    const data = await CartProductsApi.create(item);
    return data;
  };
  const update = async (
    _id: string,
    payload: CartProductsDTO
  ): Promise<void> => {
    const index = cart.findIndex((item) => item._id == _id);
    cart[index].quantity = payload.quantity;
    setCart([...cart]);
    await CartProductsApi.update(_id, payload);
  };
  const remove = async (_id: string): Promise<void> => {
    const index = cart.findIndex((item) => item._id == _id);
    cart.splice(index, 1);
    setCart([...cart]);
    await CartProductsApi.remove(_id);
  };
  useEffect(() => {
    getAllCartProducts();
    getAllProducts();
  }, []);
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
