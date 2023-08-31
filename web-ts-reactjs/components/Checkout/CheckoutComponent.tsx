import React, { useContext } from "react";
import { WithCartProductsContext } from "@/HOCs/withProductCartContext";
import { CartProductsContextType } from "@/types/productCartContextType.type";

function CheckoutComponent(props: CartProductsContextType) {
  const { cart } = props;
  let total__price: number = cart.reduce((prevState: number, currentState) => {
    return (prevState +=
      currentState.quantity *
      Number.parseFloat(currentState?.product?.product_price));
  }, 0);
  total__price = Number.parseFloat(total__price.toFixed(2));
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
export default WithCartProductsContext(CheckoutComponent);
