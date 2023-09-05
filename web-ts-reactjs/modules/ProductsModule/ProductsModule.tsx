import React, { Component, createContext } from "react";
import { connect } from "react-redux";
import { ProductsDTO } from "@/types/products.type";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import { withCartProductsContext } from "@/HOCs/withProductCartContext";
import { CartProductsContext } from "@/contexts/CartProductContext";
import { CartProductsDTO } from "@/types/cart.type";
import ProductDetail from "@/components/ProductsDetail/ProductDetail";
import ProductItem from "@/components/ProductItem/ProductItem";
import { ProductsAction } from "@/actions/product.action";
import { CartProductsAction } from "@/actions/cart-products.action";
export const ProductsContext = createContext([]);
interface ProductsState {
  products: ProductsDTO[];
  cart: CartProductsDTO[];
  idLoading: string | null;

  isShowProductDetail: boolean;
  productId: string;
}
class ProductsModule extends Component<any, ProductsState> {
  static contextType = CartProductsContext;
  context!: React.ContextType<typeof CartProductsContext>;
  constructor(props: CartProductsContextType) {
    super(props);
    this.state = {
      products: [],
      isShowProductDetail: false,
      productId: "",
      cart: [],
      idLoading: null,
    };
  }

  // SHOW MODAL
  showAddedCartItemModal = (_id: string) => {
    this.setState({
      isShowProductDetail: true,
      productId: _id,
    });
  };
  // CLOSE MODAL
  closeAddedCartItemModal = () => {
    this.setState({
      isShowProductDetail: false,
    });
  };

  // SHOW LOADING
  showAddedCartLoading = (_id: string) => {
    this.setState({
      idLoading: _id,
    });
  };
  closeAddedCartLoading = () => {
    this.setState({
      idLoading: null,
    });
  };
  // ADD TO CART
  onAddToCart = async (_id: string) => {
    this.showAddedCartLoading(_id);
    const { createCartItem, updateCartItem } = this.props;
    const { cart } = this.state;
    const index = cart.findIndex(
      (item: CartProductsDTO) => item.product!._id == _id
    );
    // IF PRODUCT EXIST IN THE CART, LET UPDATE
    if (index > -1) {
      const quantity = cart[index].quantity + 1;
      await updateCartItem(cart[index]?._id, { quantity });
      // ELSE LET CREATE NEW
    } else {
      await createCartItem({ productId: _id, quantity: 1 });
    }
    setTimeout(() => {
      this.closeAddedCartLoading();
      this.showAddedCartItemModal(_id);
    }, 500);
  };
  componentDidMount(): void {
    const { getAllProducts } = this.props;
    getAllProducts();
  }
  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<ProductsState>
  ): void {
    const { products, cart } = this.props;
    if (products.length !== prevState.products.length) {
      this.setState({ products: [...products] });
    }
    if (cart.length !== prevState.cart.length) {
      this.setState({ cart: [...cart] });
    }
  }
  render() {
    const { products, cart } = this.props;
    const { productId, isShowProductDetail, idLoading } = this.state;
    return (
      <div>
        <ProductDetail
          cart={cart}
          productId={productId}
          isShowProductDetail={isShowProductDetail}
        />
        <div
          onClick={this.closeAddedCartItemModal}
          className={`modal__body ${
            isShowProductDetail && "show__modal--body"
          }`}
        ></div>
        <div className="trending___product--container padding__content">
          <div className="trending___product--content">
            <div className="trending__product--title">
              <div>TOP TRENDING PRODUCTS</div>
              <span>Go To Trending Products</span>
            </div>
            <div className="trending__product--items">
              {products.length > 0 ? (
                products.map((product: ProductsDTO) => (
                  <ProductItem
                    idLoading={idLoading}
                    key={product?._id}
                    product={product}
                    onAddToCart={this.onAddToCart}
                  />
                ))
              ) : (
                <h3>Loading Products . . .</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispathToState = (state: any) => {
  return {
    products: state.productReducer,
    cart: state.cartProductsReducer,
  };
};
const mapDispathToProps = (dispatch: any) => {
  return {
    getAllProducts: () => dispatch(ProductsAction.getAllProducts()),
    updateCartItem: (_id: string, payload: CartProductsDTO) =>
      dispatch(CartProductsAction.updateCartItem(_id, payload)),
    createCartItem: (cartItem: CartProductsDTO) =>
      dispatch(CartProductsAction.createCartItem(cartItem)),
  };
};
export default connect(
  mapDispathToState,
  mapDispathToProps
)(withCartProductsContext(ProductsModule));
