import React from "react";
import { CartProductsProvider } from "@/contexts/CartProductContext";
import { withAuthentication } from "@/HOCs/withAuthentication";
import ProductsModule from "@/modules/ProductsModule/ProductsModule";
import CartProductModule from "@/modules/CartProductsModule/CartProductsModule";
import { Provider } from "react-redux";
import { store } from "@/store";
function App() {
  return (
    <div>
      <Provider store={store}>
        <CartProductsProvider>
          <ProductsModule />
          <CartProductModule />
        </CartProductsProvider>
      </Provider>
    </div>
  );
}
const mapDispatchToProps = {};
export default withAuthentication(App);
