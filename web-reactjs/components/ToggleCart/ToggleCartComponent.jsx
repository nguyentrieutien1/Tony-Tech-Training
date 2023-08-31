import React from "react";
import { useContext } from "react";
import { HomeContext } from "../../pages";

export default function ToggleCartComponent() {
  const { cart } = useContext(HomeContext);
  const quantity = cart.reduce((prevState, currentState) => {
    return (prevState += currentState.quantity);
  }, 0);
  return (
    <div className="cart__icon position__cart--icon">
      <div className="icon">
        <i className="fa-solid fa-cart-plus"></i>
      </div>
      <div className="amount">{quantity}</div>
      <div className="xmark icon" style={{ display: "block" }}>
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
}
