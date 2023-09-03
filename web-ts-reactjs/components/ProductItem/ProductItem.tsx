import React, { Component } from "react";
import { withCartProductsContext } from "@/HOCs/withProductCartContext";
import { CartProductsContext } from "@/contexts/CartProductContext";
import { ProductsDTO } from "@/types/products.type";
import { CartProductsDTO } from "@/types/cart.type";
import { CartProductsContextType } from "@/types/productCartContextType.type";
interface ProductItemState {
  isShowProductDetail: boolean;
  productId: string;
}
interface ProductItemProps {
  product: ProductsDTO;
  onAddToCart: (_id: string) => Promise<void>;
}

class ProductItem extends Component<ProductItemProps, ProductItemState> {
  render() {
    const { image, product_name, product_price, product_title, _id } =
      this.props.product;
    const { onAddToCart } = this.props;
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
                onClick={() => onAddToCart(_id)}
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
