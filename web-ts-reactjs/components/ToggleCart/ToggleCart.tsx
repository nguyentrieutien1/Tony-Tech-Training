import React from "react";
import { CartProductsDTO } from "@/types/cart.type";
interface ToggleCartProps {
  cart: CartProductsDTO[];
  setIsToggleCart: () => void;
  isToggleCart: boolean;
}
function ToggleCart(props: ToggleCartProps) {
  const { cart, setIsToggleCart, isToggleCart } = props;

  // TOTAL QUANTITY OF THE CART
  const quantity: number = !cart
    ? 0
    : cart.reduce((prevState, currentState) => {
        return (prevState += currentState.quantity);
    }, 0);
  
  
  // HANDLE CLOSE AND OPEN THE CART
  const handleToggleCart = (): void => {
    setIsToggleCart();
  };

  return (
    <div className={`cart__icon ${isToggleCart && "position__cart--icon"}`}>
      <div onClick={handleToggleCart} className="icon">
        <i className="fa-solid fa-cart-plus"></i>
      </div>
      <div className="amount">{quantity}</div>
      {isToggleCart && (
        <div onClick={handleToggleCart} className="xmark icon">
          <i className="fa-solid fa-xmark"></i>
        </div>
      )}
    </div>
  );
}
export default ToggleCart;
