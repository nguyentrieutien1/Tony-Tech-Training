import React, { Component, createContext } from "react";
import { ProductsDTO } from "@/types/products.type";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import { withCartProductsContext } from "@/HOCs/withProductCartContext";
import { CartProductsContext } from "@/contexts/CartProductContext";
import { CartProductsDTO } from "@/types/cart.type";
import ProductDetail from "@/components/ProductsDetail/ProductDetail";
import ProductItem from "@/components/ProductItem/ProductItem";
export const ProductsContext = createContext([]);
interface ProductsState {
  products: ProductsDTO[];
  isShowProductDetail: boolean;
  productId: string;
}
class ProductsModule extends Component<CartProductsContextType, ProductsState> {
  static contextType = CartProductsContext;
  context!: React.ContextType<typeof CartProductsContext>;
  constructor(props: CartProductsContextType) {
    super(props);
    this.state = {
      products: [],
      isShowProductDetail: false,
      productId: "",
    };
  }

  // SHOW MODAL
  showModal = (_id: string) => {
    this.setState({
      isShowProductDetail: true,
      productId: _id,
    });
  };

  // CLOSE MODAL
  closeModal = () => {
    this.setState({
      isShowProductDetail: false,
    });
  };

  // ADD TO CART
  onAddToCart = async (_id: string) => {
    const { cart, create, update } = this.context;
    const index = cart.findIndex(
      (item: CartProductsDTO) => item.product!._id == _id
    );
    // IF PRODUCT EXIST IN THE CART, LET UPDATE
    if (index > -1) {
      await update(cart[index]._id!, 0, { quantity: 1 });
      // ELSE LET CREATE NEW
    } else {
      await create({ productId: _id, quantity: 1 });
    }
    this.showModal(_id);
  };

  render() {
    const { products, cart } = this.context;
    const { productId, isShowProductDetail } = this.state;
    return (
      <div>
        <ProductDetail
          cart={cart}
          _id={productId}
          isShowProductDetail={isShowProductDetail}
        />
        <div
          onClick={this.closeModal}
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
export default withCartProductsContext(ProductsModule);
