import React, { useEffect, useState } from "react";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import { ProductDTO } from "@/types/products.type";
import { WithCartProductsContext } from "@/HOCs/withProductCartContext";
function CartListComponent(props: ProductDTO | CartProductsContextType) {
  const { image, product_name, product_price, quantity, _id } =
    props as ProductDTO;
  const { cart, remove, setCart, update } = props as CartProductsContextType;
  const [valueInput, setValueInput] = useState<number>(quantity!);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setValueInput(quantity!);
  }, [quantity]);
  const helpUpdateQuantityCartItem = async (
    _id: string,
    { type, value }: { type: number; value?: number }
  ) => {
    const cartItemIndex = cart.findIndex((cart) => cart?._id == _id);
    const quantity: number = cart[cartItemIndex]?.quantity!;
    let payload = type == 0 ? quantity - 1 : type == 2 ? quantity + 1 : value;
    if (payload && payload <= 1) {
      payload = 1;
    }
    cart[cartItemIndex].quantity = payload!;
    setCart([...cart]);
    update(_id, { quantity: payload! });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    let value = parseInt(e!.target.value);
    if (value == 0) {
      value = 1;
    }
    setValueInput(value);
  };
  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement> | null,
    number: number
  ) => {
    showLoading();
    if (number == 1) {
      let value = parseInt(e!.target.value);

      helpUpdateQuantityCartItem(_id, { type: number, value });
    } else {
      helpUpdateQuantityCartItem(_id, { type: number });
    }
    setTimeout(() => {
      hiddenLoading();
    }, 100);
  };
  const hiddenLoading = () => {
    setIsLoading(false);
  };
  const showLoading = () => {
    setIsLoading(true);
  };
  const handleRemove = () => {
    const index = cart.findIndex((item) => item._id == _id);
    cart.splice(index, 1);
    setCart([...cart]);
    remove(_id);
  };
  return (
    <div className="cart__item">
      <div className="cart__item--info">
        <div className={`sub__spin ${isLoading && "show__sub-spin"}`} />
        <i
          className={`fa-solid fa-spinner fa-spin fa-spin-item ${
            isLoading && "show__fa-spin-item"
          }`}
        />
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
              onClick={() => handleUpdate(null, 0)}
            >
              -
            </p>
            <input
              type="number"
              className="update__quantity-input"
              value={valueInput}
              data-id="64f00a9c11ec7096223c0687"
              onBlur={(e) => handleUpdate(e, 1)}
              onChange={handleChange}
            />
            <p
              className="increase__product--btn update__quantity--btn"
              data-id="64f00a9c11ec7096223c0687"
              onClick={() => handleUpdate(null, 2)}
            >
              +
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={handleRemove}
        className="cart__item--delete-btn"
        data-id="64f00a9c11ec7096223c0687"
      >
        <i className="fa-solid fa-xmark" />
      </div>
    </div>
  );
}
export default WithCartProductsContext(CartListComponent);
