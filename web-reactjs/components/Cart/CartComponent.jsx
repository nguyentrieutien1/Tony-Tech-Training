import React, { useContext } from "react";
import CartListComponent from "../CartList/CartListComponent";
import CheckoutComponent from "../Checkout/CheckoutComponent";
import ToggleCartComponent from "../ToggleCart/ToggleCartComponent";
import { HomeContext } from "../../pages/index";

export default function CartComponent() {
  const { cart } = useContext(HomeContext);
  console.log(cart);
  return (
    <>
      <ToggleCartComponent />
      <div className="cart__container show__cart--container">
        <div className="cart__items">
          {cart.map((item) => {
            return (
              <CartListComponent
                image={item?.product?.image}
                product_name={item?.product?.product_name}
                product_price={item?.product?.product_price}
                product_title={item?.product?.product_title}
                quantity={item?.quantity}
                _id={item?._id}
                key={item?._id}
              />
            );
          })}
        </div>
        <CheckoutComponent />
      </div>
    </>
  );
}