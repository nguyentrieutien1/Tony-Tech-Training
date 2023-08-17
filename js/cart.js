import { PRODUCT_NAME } from "../contains/key_name.js";
import { products } from "../data/products.js";
import { getFromLocalStorage } from "../helpers/storage.js";
import { toInt } from "../utils/coverToInt.js";
import { handleIncrement } from "./increaseProduct.js";
import { handleDecrement } from "./decreaseProduct.js";

export const showCart = () => {
  const getProductFromLocal = getFromLocalStorage(PRODUCT_NAME);
  const cart = document.querySelector(".cart__items");
  const findProducts = products.filter((product) => {
    const exitsProduct = getProductFromLocal?.find(
      (productLocal) => toInt(productLocal.id) == toInt(product.id)
    );
    if (exitsProduct) {
      product.quantity = exitsProduct.quantity;
      return product;
    }
  });
  const renderedProduct = findProducts.map((product) => {
    return `<div class="cart__item">
						<div class="cart__item--info">
							<img src="${product.image}" alt="">
							<div class="cart__item--content">
								<div class="cart__item--title">
									<span>Rockstar XD775...</span>
								</div>
								<div class="cart__item--price">
									<span>$ ${product.product_price}</span>
								</div>
								<div class="cart__item--quantity">
									<p  data-id="${product.id}" class="decrease__product--btn">-</p>
									<input  class="update__quantity-input" value="${product.quantity}" data-id="${product.id}">
									<p class="increase__product--btn" data-id="${product.id}">+</p>
			
								</div>
							</div>
			
						</div>
						<div class="cart__item--delete-btn">
							<i class="fa-solid fa-xmark"></i>
						</div>
			
					</div>`;
  });

  cart.innerHTML = renderedProduct.join(" ");
  handleIncrement();
  handleDecrement();
};
showCart();
