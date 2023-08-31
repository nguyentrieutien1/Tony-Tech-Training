import { CartProductsProvider } from "@/contexts/CartProductContext";
import React from "react";
import ProductComponent from "@/components/Product/ProductComponent";
import CartComponent from "@/components/Cart/CartComponent";
export default function App() {
  return (
    <>
      <CartProductsProvider>
        <ProductComponent />
        <CartComponent />
      </CartProductsProvider>
    </>
  );
}
