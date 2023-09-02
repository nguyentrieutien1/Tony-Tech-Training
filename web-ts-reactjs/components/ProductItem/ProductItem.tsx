import React, { Component } from "react";
import { withCartProductsContext } from "@/HOCs/withProductCartContext";
import { CartProductsContext } from "@/contexts/CartProductContext";
import { ProductsDTO } from "@/types/products.type";
import { CartProductsDTO } from "@/types/cart.type";
interface ProductItemState {
  isShowProductDetail: boolean;
  productId: string;
  create: (payload: CartProductsDTO) => Promise<CartProductsDTO>;
  update: (_id: string, payload: CartProductsDTO) => Promise<void>;
}

class ProductItem extends Component<ProductsDTO | any, ProductItemState> {
  // Create cart item
  handleCreate = async () => {
    const { showModal, products, _id, create } = this.props;
    const product = products.find((product: ProductsDTO) => product._id == _id);
    showModal(_id);
    await create({ productId: product?._id!, quantity: 1 });
  };
  // Update
  handleUpdate = async (index: number) => {
    console.log("handleUpdate");
    const { showModal, _id, cart, update } = this.props;
    const quantity = cart[index].quantity + 1;
    showModal(_id);
    if (cart[index]._id) {
      await update(cart[index]._id!, { quantity });
    }
  };
  // Function handle if product item exist in cart, let update, else let create new
  handleAddOrUpdate = async () => {
    const { cart, _id } = this.props;
    if (cart.length === 0) {
      // if cart empty, create new cart item
      this.handleCreate();
    } else {
      const index = cart.findIndex(
        (item: CartProductsDTO) => item?.product?._id == _id
      );
      if (index > -1) {
        // else if cart item exist, let update
        this.handleUpdate(index);
      } else {
        // else create new
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
export default ProductItem;
