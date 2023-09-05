import React, { Component } from "react";
import { CartProductsDTO } from "@/types/cart.type";
import { ProductsDTO } from "@/types/products.type";
interface ProductDetailProps {
  _id: string;
  isShowProductDetail: boolean;
  cart: CartProductsDTO[];
}
// SHOW PRODUCT DETAIL IN MODAL
class ProductDetail extends Component<ProductDetailProps> {
  render() {
    const { _id, isShowProductDetail, cart } = this.props;

    const cartItem = cart.find(
      (item: CartProductsDTO) => item.product?._id == _id
    );
    if (cartItem) {
      const quantity = cartItem?.quantity!;
      const { product_name, product_price, image } =
        cartItem?.product as ProductsDTO;
      return (
        <div>
          <div
            className={`modal__container ${
              isShowProductDetail && "show__modal"
            }`}
          >
            <h4>
              <i className="fa-solid fa-check" />
              Product successfully added to your shopping cart
            </h4>
            <div className="modal__content">
              <div className="modal__product">
                <img src={image} alt="" />
                <div className="modal__product--p">
                  <div className="modal__product--title">{product_name}</div>
                  <div className="modal__product--price">
                    <span>$ {quantity * parseInt(product_price)}</span>{" "}
                    <span>Size: </span>
                    <b>S</b>
                  </div>
                  <div className="modal__product--quantity">
                    <span>Quantity:</span>
                    <b>{quantity}</b>
                  </div>
                </div>
              </div>
              <div className="modal__checkout">
                <div className="modal__checkout--quantity">
                  There are 25 items in your cart.
                </div>
                <div className="modal__checkout--total">Subtotal: $ 682.00</div>
                <div className="modal__checkout--quantity">Shipping: $0.00</div>
                <div className="modal__checkout--tax">
                  Total (tax excl.) $0.00
                </div>
                <div className="modal__checkout--tax">
                  Total (tax excl.) $236.84
                </div>
                <div className="modal__checkout--taxes">Taxes: $0.00</div>
                <div className="modal__checkout--btn">
                  <span>CONTINUE SHOPPING</span>
                  <span>
                    <i className="fa-solid fa-check" />
                    PROCCED TO CHECKOUT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <></>;
  }
}
export default ProductDetail;
