import React, { createContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import { CartProductsProviderProps } from "@/types/productCartProviderProps.type";
import { ProductsDTO } from "@/types/products.type";
import { CartProductsDTO } from "@/types/cart.type";
import { CartProductsApi } from "@/apis/cart-products.api";
const CartProductsContext = createContext<CartProductsContextType>(
  {} as CartProductsContextType
);
const CartProductsProvider = ({ children }: CartProductsProviderProps) => {
  const [products, setProducts] = useState<ProductsDTO[]>([]);
  const [cart, setCart] = useState<CartProductsDTO[]>([]);
  const [isToggleCart, setIsToggleCart] = useState<boolean>(false);

  // const getAllProducts = async () => {
  //   await ProductsAction.getAllProducts();
  // };
  // const getAllCartProducts = async () => {
  //   const cartProducts = await CartProductsApi.getAll();
  //   setCart(cartProducts);
  // };

  // const updateCartItem = async (
  //   cartId: string,
  //   payload: CartProductsDTO
  // ): Promise<void> => {
  //   // CALL API TO UPDATE CART ITEM
  //   await CartProductsApi.update(cartId, payload);
  //   // HANDLE UPDATE STATE
  //   const newCart = cart.map((cartItem) => {
  //     if (cartItem._id == cartId) {
  //       cartItem.quantity = payload.quantity;
  //       return cartItem;
  //     }
  //     return cartItem;
  //   });
  //   setCart([...newCart]);
  // };

  // const removeCartItem = async (cartId: string): Promise<void> => {
  //   await CartProductsApi.remove(cartId);
  //   const index = cart.findIndex((item) => item._id == cartId);
  //   cart.splice(index, 1);
  //   setCart([...cart]);
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  // useEffect(() => {
  //   getAllCartProducts();
  // }, []);
  return (
    <CartProductsContext.Provider
      value={{
        isToggleCart,
        setIsToggleCart,
        // updateCartItem,
        // removeCartItem,
      }}
    >
      {children}
    </CartProductsContext.Provider>
  );
};

export { CartProductsContext, CartProductsProvider };
