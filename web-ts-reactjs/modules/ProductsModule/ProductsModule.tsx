import React, { Component, createContext } from "react";
import { connect } from "react-redux";
import { ProductsDTO } from "@/types/products.type";
import { withCartProductsContext } from "@/HOCs/withCartProductsContext";
import { CartProductsContext } from "@/contexts/CartProductContext";
import { CartProductsDTO } from "@/types/cart.type";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import ProductItem from "@/components/ProductItem/ProductItem";
import { ProductsAction } from "@/actions/product.action";
import { CartProductsAction } from "@/actions/cart-products.action";
export const ProductsContext = createContext([]);
interface ProductsProps {
  createCartItem: (item: CartProductsDTO) => Promise<void>;
  updateCartItem: (cartId: string, payload: CartProductsDTO) => Promise<void>;
  getAllProducts: () => Promise<ProductsDTO[]>;
  products: ProductsDTO[];
  cart: CartProductsDTO[];
}
interface ProductsState {
  products: ProductsDTO[];
  cart: CartProductsDTO[];
  idLoadingProductItem: string | null;
  isShowProductDetail: boolean;
  productId: string;
}

class ProductsModule extends Component<ProductsProps, ProductsState> {
  static contextType = CartProductsContext;
  context!: React.ContextType<typeof CartProductsContext>;
  constructor(props: ProductsProps) {
    super(props);
    this.state = {
      products: [],
      isShowProductDetail: false,
      productId: "",
      cart: [],
      idLoadingProductItem: null,
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

  // SHOW PRODUCT LOADING
  showAddedProductLoading = (_id: string) => {
    this.setState({
      idLoadingProductItem: _id,
    });
  };

  // CLOSE PRODUCT LOADING
  closeAddedProductLoading = () => {
    this.setState({
      idLoadingProductItem: null,
    });
  };

  onAddToCart = async (_id: string) => {
    this.showAddedProductLoading(_id);
    const { createCartItem, updateCartItem } = this.props;
    const { cart } = this.state;
    const index = cart.findIndex(
      (item: CartProductsDTO) => item.product!._id == _id
    );
    // IF PRODUCT EXIST IN THE CART, LET UPDATE
    if (index > -1) {
      const quantity = cart[index].quantity + 1;
      await updateCartItem(cart[index]?._id!, { quantity });
      // ELSE LET CREATE NEW
    } else {
      await createCartItem({ productId: _id, quantity: 1 });
    }
    this.showAddedCartItemModal(_id);
    this.closeAddedProductLoading();
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
    const { products, cart } = this.state;
    const { productId, isShowProductDetail, idLoadingProductItem } = this.state;
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
                    idLoadingProductItem={idLoadingProductItem}
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

const mapStateToProps = (state: any) => {
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
  mapStateToProps,
  mapDispathToProps
)(withCartProductsContext(ProductsModule));
