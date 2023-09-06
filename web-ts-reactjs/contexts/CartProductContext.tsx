import React, { createContext, useState } from "react";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import { CartProductsProviderProps } from "@/types/productCartProviderProps.type";
const CartProductsContext = createContext<CartProductsContextType>(
  {} as CartProductsContextType
);
const CartProductsProvider = ({ children }: CartProductsProviderProps) => {
  const [isToggleCart, setIsToggleCart] = useState<boolean>(false);

  return (
    <CartProductsContext.Provider
      value={{
        isToggleCart,
        setIsToggleCart,
      }}
    >
      {children}
    </CartProductsContext.Provider>
  );
};

export { CartProductsContext, CartProductsProvider };
