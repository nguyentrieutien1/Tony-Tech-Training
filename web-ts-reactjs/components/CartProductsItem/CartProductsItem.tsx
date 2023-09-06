import React, { useEffect, useState } from "react";
import { ProductsDTO } from "@/types/products.type";
import { CartProductsDTO } from "@/types/cart.type";


interface CartProductsItemProps {
  onDelete: (_id: string) => void;
  onUpdate: (_id: string, payload: CartProductsDTO) => Promise<void>;
  cartItem: CartProductsDTO;
  cart: CartProductsDTO[];
  idLoadingCartItem: string | null;
}


function CartProductsItem(props: CartProductsItemProps) {
  const { onDelete, onUpdate, cartItem, cart, idLoadingCartItem } = props;
  const { quantity, _id } = cartItem;
  const { image, product_name, product_price } =
    cartItem.product as ProductsDTO;
  
  

  const [valueInput, setValueInput] = useState<number>(quantity!);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    let value = parseInt(e!.target.value);
    if (value <= 1) {
      value = 1;
    }
    setValueInput(value);
  };


  
  const handleUpdateCartItem = async (
    cartId: string,
    type: number,
    value: number
  ) => {
    const index = cart.findIndex((item) => item._id == cartId);
    let quantity = cart[index]?.quantity!;
    // IF ONCLICK EVENT (TYPE == 0), +1 OR +(-1)
    if (type === 0) {
      quantity = quantity + value;
      // ELSE BLUR EVENT (TYPE == 1), ASSIGN THIS VALUE TO QUANTITY
    } else {
      quantity = value;
    }
    quantity = quantity <= 1 ? 1 : quantity;
    await onUpdate(cartId, { quantity });
  };




  useEffect(() => {
    setValueInput(quantity!);
  }, [quantity]);




  return (
    <div className="cart__item">
      <div className="cart__item--info">
        <div
          className={`sub__spin ${
            idLoadingCartItem == _id && "show__sub-spin"
          }`}
        />
        <i
          className={`fa-solid fa-spinner fa-spin fa-spin-item ${
            idLoadingCartItem == _id && "show__fa-spin-item"
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
              // PASS ID, TYPE, AND VALUE (IF - BUTTON, VALUE = -1)
              onClick={() => handleUpdateCartItem(_id!, 0, -1)}
            >
              -
            </p>
            <input
              type="number"
              className="update__quantity-input"
              value={valueInput}
              data-id="64f00a9c11ec7096223c0687"
              onBlur={(e) => handleUpdateCartItem(_id!, 1, valueInput)}
              onChange={handleChange}
            />
            <p
              className="increase__product--btn update__quantity--btn"
              data-id="64f00a9c11ec7096223c0687"
              onClick={() => handleUpdateCartItem(_id!, 0, 1)}
            >
              +
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => onDelete(_id!)}
        className="cart__item--delete-btn"
        data-id="64f00a9c11ec7096223c0687"
      >
        <i className="fa-solid fa-xmark" />
      </div>
    </div>
  );
}


export default CartProductsItem;
