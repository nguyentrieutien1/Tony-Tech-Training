import React, { Component } from "react";
import ToggleCart from "@/components/ToggleCart/ToggleCart";
import { CartProductsContext } from "@/contexts/CartProductContext";
import { CartProductsDTO } from "@/types/cart.type";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import CartProductsItem from "@/components/CartProductsItem/CartProductsItem";
import Checkout from "@/components/Checkout/Checkout";
class CartProductModule extends Component<CartProductsContextType> {
  static contextType = CartProductsContext;
  context!: React.ContextType<typeof CartProductsContext>;

  // HANDLE DELETE CART ITEM
  onDelete = async (_id: string) => {
    const { remove } = this.context;
    await remove(_id);
  };

  // HANDLE UPDATE CART ITEM
  onUpdate = async (_id: string, type: number, quantity: number) => {
    const { update } = this.context;
    await update(_id, type, { quantity });
  };

  
  render() {
    const { isToggleCart, cart, setIsToggleCart } = this.context;
    return (
      <>
        {/* SHOW BUTTON TOGGLE CART */}
        <ToggleCart
          cart={cart}
          isToggleCart={isToggleCart}
          setIsToggleCart={() => setIsToggleCart((prevState) => !prevState)}
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
                      key={cartItem?._id}
                      onUpdate={this.onUpdate}
                      onDelete={this.onDelete}
                    />
                  );
                }
              })}
          </div>
          {/* SHOW CHECKOUT */}
          <Checkout cart={cart} />
        </div>
      </>
    );
  }
}
export default CartProductModule;
