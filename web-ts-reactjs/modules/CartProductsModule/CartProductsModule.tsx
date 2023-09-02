import React, { Component } from "react";
import { withCartProductsContext } from "@/HOCs/withProductCartContext";
import ToggleCart from "@/components/ToggleCart/ToggleCart";
import { CartProductsContext } from "@/contexts/CartProductContext";
import { CartProductsDTO } from "@/types/cart.type";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import CartProductsItem from "@/components/CartProductsItem/CartProductsItem";
import Checkout from "@/components/Checkout/Checkout";
class CartProductModule extends Component<CartProductsContextType> {
  static contextType = CartProductsContext;
  context!: React.ContextType<typeof CartProductsContext>;
  remove = async (_id: string) => {
    const { remove } = this.context;
    await remove(_id);
  };
  update = async (_id: string, payload: CartProductsDTO) => {
    const { update } = this.context;
    await update(_id, payload);
  };
  setIsToggleCart = () => {
    const { setIsToggleCart } = this.context;
    setIsToggleCart((prevState) => !prevState);
  };
  render() {
    const { isToggleCart, cart } = this.context;
    return (
      <>
        {/* SHOW BUTTON TOGGLE CART */}
        <ToggleCart
          cart={cart}
          isToggleCart={isToggleCart}
          setIsToggleCart={this.setIsToggleCart}
        />
        <div
          className={`cart__container ${
            isToggleCart && "show__cart--container"
          }`}
        >
          <div className="cart__items">
            {/* SHOW CART ITEM */}
            {cart?.length > 0 &&
              cart.map((cartItem: CartProductsDTO) => {
                if (cartItem.product && cartItem._id) {
                  return (
                    <CartProductsItem
                      cartItem={cartItem}
                      cart={cart}
                      update={this.update}
                      remove={this.remove}
                      key={cartItem?._id}
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
}
export default withCartProductsContext(CartProductModule);
