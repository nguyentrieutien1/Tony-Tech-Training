import { WithCartProductsContext } from "@/HOCs/withProductCartContext";
import { CartProductsContext } from "@/contexts/CartProductContext";
import { ProductDTO } from "@/types/products.type";
import React, { Component } from "react";
import ProductDetailComponent from "../ProductsDetail/ProductDetailComponent";
interface MyComponentState {
  isShowProductDetail: boolean;
  productId: string;
}

class ProductListComponent extends Component<
  ProductDTO | any,
  MyComponentState
> {
  static contextType = CartProductsContext;
  context!: React.ContextType<typeof CartProductsContext>;
  constructor(props: ProductDTO) {
    super(props);
    this.state = {
      isShowProductDetail: false,
      productId: "",
    };
  }
  handleCreate = async () => {
    const { showModal } = this.props;
    const { _id } = this.props;
    const { create, setCart } = this.context;
    const product = this.context.products.find((product) => product._id == _id);
    const cartItem = await create({ productId: product?._id!, quantity: 1 });
    cartItem.product = product;
    setCart((prevState) => [...prevState, cartItem]);
    showModal(_id);
    this.setState({ isShowProductDetail: true, productId: _id });
  };
  handleUpdate = async (index: number) => {
    const { showModal } = this.props;
    const { cart, setCart, update } = this.context;
    const quantity = cart[index].quantity + 1;
    cart[index].quantity = quantity;
    setCart([...cart]);
    showModal(this.props._id);
    if (cart[index]._id) {
      update(cart[index]._id!, { quantity });
    }
  };
  handleAddOrUpdate = async () => {
    const { cart } = this.context;
    const { _id } = this.props;
    if (cart.length === 0) {
      this.handleCreate();
    } else {
      const index = cart.findIndex((p) => p?.product?._id == _id);
      if (index > -1) {
        this.handleUpdate(index);
      } else {
        this.handleCreate();
      }
    }
  };
  onCloseModel = () => {
    this.setState({ isShowProductDetail: false });
  };
  render() {
    const { image, product_name, product_price, product_title, _id } =
      this.props;
    return (
      <>
        <div className="deal__product--item toptreding__product--item">
          <i className="fa-solid fa-spinner fa-spin fa-spin-1" />
          <div className="deal__product--item-img">
            <img src={image} className="img-1" alt="Image" />
            <img src={image} className="img-2" alt="Image" />
          </div>
          <div className="deal__product--item-list--icon">
            <i className="fa-regular fa-heart">
              <h4 className="sub-icon">Quick view</h4>
            </i>
            <i className="fa-regular fa-eye">
              <h4 className="sub-icon">Quick view</h4>
            </i>
            <i className="fa-solid fa-rotate-left">
              <h4 className="sub-icon">Quick view</h4>
            </i>
          </div>
          <div className="deal__product--meta">
            <div className="deal__product--item-des">
              <div>{product_name}</div>
            </div>
            <div className="deal__product--item-name">
              <div>{product_title}</div>
            </div>
            <div className="deal__product--item-start">
              <i className="fa-regular fa-star" />
              <i className="fa-regular fa-star" />
              <i className="fa-regular fa-star" />
              <i className="fa-regular fa-star" />
              <i className="fa-regular fa-star" />
            </div>
            <div className="deal__product--item-price-2">
              <div>$ {product_price}</div>
              <i
                onClick={this.handleAddOrUpdate}
                className="fa-solid fa-cart-shopping shopping-btn"
                data-id={1}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default WithCartProductsContext(ProductListComponent);
