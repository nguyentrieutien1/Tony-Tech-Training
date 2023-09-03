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
  onDelete = async (_id: string) => {
    const { remove } = this.context;
    await remove(_id);
  };
  onUpdate = async (_id: string, type: number, value: number) => {
    const { cart, update } = this.context;
    const index = cart.findIndex((item) => item._id == _id);
    let quantity = cart[index]?.quantity!;
    // IF TYPE == BUTTON EVENT, +1 OR +(-1)
    if (type === 0) {
      quantity = quantity + value;
      // ELSE ASSIGN THIS VALUE FOR QUANTITY
    } else {
      quantity = value;
    }
    await update(_id, { quantity });
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
