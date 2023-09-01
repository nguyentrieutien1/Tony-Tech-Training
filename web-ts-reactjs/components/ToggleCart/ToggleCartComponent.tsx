import { WithCartProductsContext } from "@/HOCs/withProductCartContext";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import React from "react";
function ToggleCartComponent(props: CartProductsContextType) {
  const { cart, setIsToggleCart, isToggleCart } = props;
  const quantity: number = !cart
    ? 0
    : cart.reduce((prevState, currentState) => {
        return (prevState += currentState.quantity);
      }, 0);
  const handleToggleCart = (): void => {
    setIsToggleCart((prevState) => !prevState);
  };
  return (
    <div className={`cart__icon ${isToggleCart && "position__cart--icon"}`}>
      <div onClick={handleToggleCart} className="icon">
        <i className="fa-solid fa-cart-plus"></i>
      </div>
      <div className="amount">{quantity}</div>
      {isToggleCart && (
        <div
          onClick={handleToggleCart}
          className="xmark icon"
          style={{ display: "block" }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      )}
    </div>
  );
}
export default WithCartProductsContext(ToggleCartComponent);
