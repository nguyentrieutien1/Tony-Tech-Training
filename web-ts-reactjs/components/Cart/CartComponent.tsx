import React, { useContext } from "react";
import CartListComponent from "../CartList/CartListComponent";
import CheckoutComponent from "../Checkout/CheckoutComponent";
import ToggleCartComponent from "../ToggleCart/ToggleCartComponent";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import { CartDTO } from "@/types/cart.type";
import { WithCartProductsContext } from "@/HOCs/withProductCartContext";

function CartComponent(props: CartProductsContextType) {
  const { cart, isToggleCart } = props;
  return (
    <>
      <ToggleCartComponent />
      <div
        className={`cart__container ${isToggleCart && "show__cart--container"}`}
      >
        <div className="cart__items">
          {cart?.length > 0 &&
            cart.map((item: CartDTO) => {
              if (item.product && item._id) {
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
              }
            })}
        </div>
        <CheckoutComponent />
      </div>
    </>
  );
}
export default WithCartProductsContext(CartComponent);
