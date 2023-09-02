import React, { useEffect, useState } from "react";
import { ProductsDTO } from "@/types/products.type";
import { CartProductsDTO } from "@/types/cart.type";
interface CartProductsItemProps {
  remove: (_id: string) => void;
  update: (_id: string, payload: CartProductsDTO) => Promise<void>;
  cart: CartProductsDTO[];
  cartItem: CartProductsDTO;
}
function CartProductsItem(props: CartProductsItemProps) {
  const { cartItem } = props;
  const { quantity, _id } = cartItem;
  const { image, product_name, product_price } =
    cartItem.product as ProductsDTO;
  console.log(cartItem);
  const { remove, cart, update } = props as CartProductsItemProps;
  const [valueInput, setValueInput] = useState<number>(quantity!);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // HELPER UPDATE, CHECK TYPE TO UPDATE +1, -1 OR = VALUE
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
    update(_id, { quantity: payload! });
  };
  // CHANGE INPUT VALUE BECAUSE BLUR EVENT CAN'T CHANGE WHEN WE WANT ENTER VALUE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    let value = parseInt(e!.target.value);
    if (value == 0) {
      value = 1;
    }
    setValueInput(value);
  };
  const handleUpdate = (e: any, number: number) => {};
  // // UPDATE FUNCTION
  // const handleUpdate = (
  //   e: React.ChangeEvent<HTMLInputElement> | null,
  //   number: number
  // ) => {
  //   showLoading();
  //   // IF UPDATE BY INPUT TYPE, PASS VALUE TO HELPER UPDATE
  //   if (number == 1) {
  //     let value = parseInt(e!.target.value);

  //     helpUpdateQuantityCartItem(_id!, { type: number, value });
  //     // ELSE +1 or -1 BY BUTTON TYPE
  //   } else {
  //     helpUpdateQuantityCartItem(_id!, { type: number });
  //   }
  //   setTimeout(() => {
  //     hiddenLoading();
  //   }, 100);
  // };
  // const hiddenLoading = () => {
  //   setIsLoading(false);
  // };
  // const showLoading = () => {
  //   setIsLoading(true);
  // };

  useEffect(() => {
    setValueInput(quantity!);
  }, [quantity]);
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
        onClick={() => remove(_id!)}
        className="cart__item--delete-btn"
        data-id="64f00a9c11ec7096223c0687"
      >
        <i className="fa-solid fa-xmark" />
      </div>
    </div>
  );
}
export default CartProductsItem;
