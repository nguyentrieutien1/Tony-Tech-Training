import React from "react";
import { CartProductsProvider } from "@/contexts/CartProductContext";
import { withAuthentication } from "@/HOCs/withAuthentication";
import ProductsModule from "@/modules/ProductsModule/ProductsModule";
import CartProductModule from "@/modules/CartProductsModule/CartProductsModule";
function App() {
  return (
    <div>
      <CartProductsProvider>
        <ProductsModule />
        <CartProductModule />
      </CartProductsProvider>
    </div>
  );
}
export default withAuthentication(App);
