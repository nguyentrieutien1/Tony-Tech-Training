import { products } from "../data/products.js";
import { toInt } from "../utils/coverToInt.js";
import { handleIncrement } from "./increaseProduct.js";
import { handleDecrement } from "./decreaseProduct.js";
import { handleUpdateQuantity } from "./focusToChangeQuantity.js";
import { deleteProduct } from "./deleteProduct.js";
import { totalPrice } from "../helpers/total_price.helper.js";
import { cart } from "../global/state.js";
import { checkout } from "./checkout.js";
import { showQuantityProduct } from "./showQuantityProduct.js";

export const showCart = () => {
  const cart__element = document.querySelector(".cart__items");
  const cart__checkout = document.querySelector(".cart__checkout--container");
  const findProducts = cart?.map((product) => {
    const exitsProduct = products?.find(
      (productLocal) => toInt(productLocal?.id) == toInt(product?.id)
    );
    if (exitsProduct) {
      exitsProduct.quantity = product?.quantity;
      return exitsProduct;
    }
  });
  const renderedProduct = findProducts?.map((product, index) => {
    return `
    <div class="cart__item">
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
									<input type="number" class="update__quantity-input" value="${
                    product.quantity
                  }" data-id="${product.id}">
									<p class="increase__product--btn" data-id="${product.id}">+</p>
			
								</div>
							</div>
			
						</div>
						<div class="cart__item--delete-btn" data-id="${product.id}">
							<i class="fa-solid fa-xmark"></i>
						</div>
			
          </div>
          
          `;
  });
  const renderedCartCheckout =
    findProducts?.length > 0
      ? `
						<div class="cart__checkout--info">
							<div class="cart__checkout-sub">
								<p>SUBTOTAL</p>
								<p class="sub__total">$ ${totalPrice()}</p>
							</div>
							<div class="cart__checkout-sub">
								<p>SHIPPING</p>
								<p>$0</p>
							</div>
							<div class="cart__checkout-sub">
								<p>TAXES</p>
								<p>$0</p>
							</div>
							<div class="cart__checkout-sub total">
								<p>TOTAL</p>
								<b class="total__price">$ ${totalPrice()}</b>
							</div>
						</div>
						<div class="cart__checkout-btns">
							<div class="cart__checkout--btn cart__checkout--btn-view">
								VIEW CART
							</div>
							<div class="cart__checkout--btn cart__checkout--btn-checkout">
								CHECKOUT
							</div>
						</div>
					</div>
						`
      : `<div style="padding-top: 20px" class="cart__checkout-btns">
						<div class="cart__checkout--btn cart__checkout--btn-view">
								VIEW CART
							</div>
							<div class="cart__checkout--btn cart__checkout--btn-checkout">
								CHECKOUT
							</div>
					`;
  cart__element.innerHTML = renderedProduct.join(" ");
  cart__checkout.innerHTML = renderedCartCheckout;
  handleIncrement();
  handleDecrement();
  handleUpdateQuantity();
  deleteProduct();
  checkout();
  showQuantityProduct();
};
showCart();
