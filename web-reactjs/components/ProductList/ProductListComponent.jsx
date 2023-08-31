import React, { useContext } from "react";
import { CartContext, HomeContext, ProductsContext } from "../../pages/index";

export default function ProductListComponent(props) {
  const { _id } = props;
  const { cart, create, update } = useContext(HomeContext);
  const handleAddToCart = () => {
    if (cart?.length == 0) {
      create(_id);
    } else {
      const index = cart.findIndex((p) => p?.product?._id == _id);
      if (index > -1) {
        const quantity = cart[index].quantity + 1;
        update(index, { quantity });
      } else {
        create(_id);
      }
    }
  };
  const { image, product_name, product_price, product_title } = props;
  return (
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
            onClick={handleAddToCart}
            className="fa-solid fa-cart-shopping shopping-btn"
            data-id={1}
          />
        </div>
      </div>
    </div>
  );
}
