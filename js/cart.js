import { PRODUCT_NAME } from "../contains/key_name.js";
import { products } from "../data/products.js";
import { getFromLocalStorage } from "../helpers/storage.js";
import { toInt } from "../utils/coverToInt.js";
import { handleIncrement } from "./increaseProduct.js";
import { handleDecrement } from "./decreaseProduct.js";
import { handleUpdateQuantity } from "./updateQuantity.js";
import { deleteProduct } from "./deleteProduct.js";

export const showCart = () => {
  const getProductFromLocal = getFromLocalStorage(PRODUCT_NAME);
  const cart = document.querySelector(".cart__items");
  const findProducts = getProductFromLocal.map((product) => {
    const exitsProduct = products?.find(
      (productLocal) => toInt(productLocal.id) == toInt(product.id)
    );
    if (exitsProduct) {
      exitsProduct.quantity = product.quantity;
      return exitsProduct;
    }
  });
  console.log(findProducts);
  const renderedProduct = findProducts.map((product, index) => {
    return `<div class="cart__item">
						<div class="cart__item--info">
							<div class="sub__spin sub__spin-${index}"></div>

						<i class="fa-solid fa-spinner fa-spin fa-spin-item ${`fa-spin-item-${index}`}"></i>
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
									<input  class="update__quantity-input" value="${product.quantity}" data-id="${
      product.id
    }">
									<p class="increase__product--btn" data-id="${product.id}">+</p>
			
								</div>
							</div>
			
						</div>
						<div class="cart__item--delete-btn" data-id="${product.id}">
							<i class="fa-solid fa-xmark"></i>
						</div>
			
					</div>`;
  });

  cart.innerHTML = renderedProduct.join(" ");
  handleIncrement();
  handleDecrement();
  handleUpdateQuantity();
  deleteProduct();
};
showCart();
