import React, { createContext, useContext, useState } from "react";
import { HomeContext } from "../../pages";
export default function CartListComponent(props) {
  const { remove, cart, update } = useContext(HomeContext);
  const { image, product_name, product_price, product_title, quantity, _id } =
    props;
  const [changeQuantity, setChangeQuantity] = useState(quantity);

  const updateQuantityCartItem = async (id, { type, value }) => {
    const product = cart.find((cart) => cart?._id == id);
    const cartItemIndex = cart.findIndex((item) => item?._id == id);
    // const index_spin = cartState.findIndex((p) => p?._id == id);
    const quantity = product?.quantity;
    let payload = type == 0 ? quantity - 1 : type == 2 ? quantity + 1 : value;
    if (payload <= 1) {
      payload = 1;
    }
    update(cartItemIndex, { quantity: payload });
  };
  const handleUpdate = (e, number) => {
    if (number == 1) {
      const { value } = e.target;
      updateQuantityCartItem(_id, { type: number, value: changeQuantity });
      setChangeQuantity(value);
    } else {
      updateQuantityCartItem(_id, { type: number });
    }
  };
  return (
    <div className="cart__item">
      <div className="cart__item--info">
        <div className="sub__spin show__sub-spin" />
        <i className="fa-solid fa-spinner fa-spin fa-spin-item show__fa-spin-item" />
        <img src={image} />
        <div className="cart__item--content">
          <div className="cart__item--title">
            <span>{product_name}</span>
          </div>
          <div className="cart__item--price">
            <span>$ {product_price}</span>
          </div>
          <div className="cart__item--quantity">
            <p
              data-id="64f00a9c11ec7096223c0687"
              className="decrease__product--btn update__quantity--btn"
              name={0}
              onClick={(e) => handleUpdate(e, 0)}
            >
              -
            </p>
            <input
              type="number"
              className="update__quantity-input"
              value={quantity}
              data-id="64f00a9c11ec7096223c0687"
              onChange={(e) => handleUpdate(e, 1)}
              name={1}
            />
            <p
              name={2}
              className="increase__product--btn update__quantity--btn"
              data-id="64f00a9c11ec7096223c0687"
              onClick={(e) => handleUpdate(e, 2)}
            >
              +
            </p>
          </div>
        </div>
      </div>
      <div
        className="cart__item--delete-btn"
        data-id="64f00a9c11ec7096223c0687"
        onClick={() => remove(_id)}
      >
        <i className="fa-solid fa-xmark" />
      </div>
    </div>
  );
}
