import React, { useContext } from "react";
import { HomeContext } from "../../pages";

export default function CheckoutComponent() {
  const { cart } = useContext(HomeContext);
  let total__price = cart.reduce((prevState, currentState) => {
    return (prevState +=
      currentState.quantity * currentState?.product?.product_price);
  }, 0);
  total__price = total__price?.toFixed(2);
  return (
    <div className="cart__checkout">
      <div className="cart__checkout--container">
        <div className="cart__checkout--info">
          <div className="cart__checkout-sub">
            <p>SUBTOTAL</p>
            <p className="sub__total">$ {total__price}</p>
          </div>
          <div className="cart__checkout-sub">
            <p>SHIPPING</p>
            <p>$0</p>
          </div>
          <div className="cart__checkout-sub total">
            <p>TOTAL</p>
            <b className="total__price">$ {total__price}</b>
          </div>
        </div>
        <div className="cart__checkout-btns">
          <div className="cart__checkout--btn cart__checkout--btn-view">
            VIEW CART
          </div>
          <div className="cart__checkout--btn cart__checkout--btn-checkout">
            CHECKOUT
          </div>
        </div>
      </div>
    </div>
  );
}
