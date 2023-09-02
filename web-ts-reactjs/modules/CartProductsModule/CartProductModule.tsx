import { withCartProductsContext } from "@/HOCs/withProductCartContext";
import CartProducts from "@/components/CartProducts/CartProducts";
import { CartProductsContext } from "@/contexts/CartProductContext";
import { CartProductsDTO } from "@/types/cart.type";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import React, { Component } from "react";

class CartProductModule extends Component<CartProductsContextType> {
  static contextType = CartProductsContext;
  context!: React.ContextType<typeof CartProductsContext>;

  get = async () => {
    const { getAllCartProducts } = this.context;
    return await getAllCartProducts();
  };
  remove = async (_id: string) => {
    const { remove } = this.context;
    await remove(_id);
  };
  update = async (_id: string, payload: CartProductsDTO) => {
    const { update } = this.context;
    await update(_id, payload);
  };
  componentDidMount(): void {
    const { setCart } = this.context;
    this.get().then((cart) => {
      setCart([...cart]);
    });
  }
  setIsToggleCart = () => {
    const { setIsToggleCart } = this.context;
    setIsToggleCart((prevState) => !prevState);
  };
  render() {
    const { isToggleCart, cart } = this.context;
    return (
      <CartProducts
        cart={cart}
        isToggleCart={isToggleCart}
        setIsToggleCart={this.setIsToggleCart}
        remove={this.remove}
        update={this.update}
      />
    );
  }
}
export default withCartProductsContext(CartProductModule);
