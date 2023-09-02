import React from "react";
import CartProductsItem from "../CartProductsItem/CartProductsItem";
import Checkout from "../Checkout/Checkout";
import ToggleCart from "../ToggleCart/ToggleCart";
import { CartProductsDTO } from "@/types/cart.type";
interface CartProductsProps {
  cart: CartProductsDTO[];
  isToggleCart: boolean;
  remove: (_id: string) => Promise<void>;
  update: (_id: string, payload: CartProductsDTO) => Promise<void>;
  setIsToggleCart: () => void;
}
function CartProducts(props: CartProductsProps) {
  const { cart, isToggleCart, remove, update, setIsToggleCart } = props;
  return (
    <>
      {/* SHOW BUTTON TOGGLE CART */}
      <ToggleCart
        cart={cart}
        isToggleCart={isToggleCart}
        setIsToggleCart={setIsToggleCart}
      />
      <div
        className={`cart__container ${isToggleCart && "show__cart--container"}`}
      >
        <div className="cart__items">
          {/* SHOW CART ITEM */}
          {cart?.length > 0 &&
            cart.map((item: CartProductsDTO) => {
              if (item.product && item._id) {
                return (
                  <CartProductsItem
                    cart={cart}
                    update={update}
                    remove={remove}
                    image={item?.product?.image}
                    product_name={item?.product?.product_name}
                    product_price={item?.product?.product_price}
                    product_title={item?.product?.product_title}
                    quantity={item?.quantity}
                    _id={item?._id}
                    key={item?._id}
                  />
                );
              }
            })}
        </div>
        {/* SHOW CHECKOUT */}
        <Checkout />
      </div>
    </>
  );
}
export default CartProducts;
