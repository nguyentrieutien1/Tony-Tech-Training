import { CartProductsProvider } from "@/contexts/CartProductContext";
import React from "react";
import ProductComponent from "@/components/Products/ProductsComponent";
import CartComponent from "@/components/Cart/CartComponent";
import { withAuthentication } from "@/HOCs/withAuthentication";
function App() {
  return (
    <div>
      <CartProductsProvider>
        <ProductComponent />
        <CartComponent />
      </CartProductsProvider>
    </div>
  );
}
export default withAuthentication(App);