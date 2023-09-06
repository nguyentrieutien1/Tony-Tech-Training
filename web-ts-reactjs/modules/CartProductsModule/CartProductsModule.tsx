import React, { Component } from "react";
import { connect } from "react-redux";
import ToggleCart from "@/components/ToggleCart/ToggleCart";
import { CartProductsContext } from "@/contexts/CartProductContext";
import { CartProductsDTO } from "@/types/cart.type";
import CartProductsItem from "@/components/CartProductsItem/CartProductsItem";
import Checkout from "@/components/Checkout/Checkout";
import { CartProductsAction } from "@/actions/cart-products.action";

interface CartProductsProps {
  removeCartItem: (cartId: string) => Promise<void>;
  updateCartItem: (cartId: string, payload: CartProductsDTO) => Promise<void>;
  getAllCartProducts: () => Promise<void>;
  cart: CartProductsDTO[];
}

interface CartProductsState {
  idLoadingCartItem: string | null;
}

class CartProductModule extends Component<
  CartProductsProps,
  CartProductsState
> {
  static contextType = CartProductsContext;
  context!: React.ContextType<typeof CartProductsContext>;
  constructor(props: any) {
    super(props);
    this.state = {
      idLoadingCartItem: null,
    };
  }
  // HANDLE DELETE CART ITEM
  onDelete = async (_id: string) => {
    const { removeCartItem } = this.props;
    await removeCartItem(_id);
  };

  // HANDLE UPDATE CART ITEM
  onUpdate = async (_id: string, payload: CartProductsDTO) => {
    this.setState({ idLoadingCartItem: _id });
    const { updateCartItem } = this.props;
    setTimeout(async () => {
      await updateCartItem(_id, payload);
      this.setState({ idLoadingCartItem: null });
    }, 500);
  };

  componentDidMount(): void {
    const { getAllCartProducts } = this.props;
    getAllCartProducts();
  }

  render() {
    const { isToggleCart, setIsToggleCart } = this.context;
    const { idLoadingCartItem } = this.state;
    const { cart } = this.props;
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
                      idLoadingCartItem={idLoadingCartItem}
                      cartItem={cartItem}
                      key={cartItem?._id}
                      onUpdate={this.onUpdate}
                      onDelete={this.onDelete}
                      cart={cart}
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllCartProducts: () => dispatch(CartProductsAction.getAllCartProducts()),

    updateCartItem: (_id: string, payload: CartProductsDTO) =>
      dispatch(CartProductsAction.updateCartItem(_id, payload)),

    removeCartItem: (_id: string) =>
      dispatch(CartProductsAction.removeCartItem(_id)),
  };
};
const mapDispatchToState = (state: any) => {
  return {
    cart: state.cartProductsReducer,
  };
};
export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(CartProductModule);
