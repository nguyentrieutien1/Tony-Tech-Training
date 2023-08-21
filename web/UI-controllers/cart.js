import { toInt } from "../utils/covertToInt.js";
import { LOADING_SET_TIME_OUT } from "../constants/number_setTimeOut.js";
import { handleUpdateQuantity } from "./../js/focusToChangeQuantity.js";
import { totalPrice } from "../helpers/total_price.helper.js";
import { cart } from "../global/state.js";
import { loading } from "../helpers/loading.helper.js";
import cartService from "../services/cart.service.js";
import { products } from "../data/products.js";
import { clickToUpdate } from "../js/clickToUpdate.js";
import { checkout } from "../js/checkout.js";
import { showQuantityProduct } from "../js/showQuantityProduct.js";
export const createCartItem = () => {
  const shopping_btns = document.querySelectorAll(".fa-cart-shopping");
  const modal__container = document.querySelector(".modal__container");
  const modal__checkout = document.querySelector(".modal__checkout--total");
  const modal__content = document.querySelector(".modal__content");
  const modal__body = document.querySelector(".modal__body");
  shopping_btns.forEach((btn, index) => {
    btn.addEventListener("click", async function (e) {
      const spin = document.querySelector(`.fa-spin-${index}`);
      spin.style.display = "block";
      const product_id = toInt(this?.getAttribute("data-id"));
      await cartService.createOrUpdte(product_id);
      await getCartItems();
      modal__container?.classList?.add("show__modal");
      spin.style.display = "none";
      modal__checkout.innerHTML = `
							Subtotal: $ ${totalPrice({ id: product_id })}
						`;
      modal__content.innerHTML = await getCartItemById(product_id);
      modal__body.classList?.add("show__modal--body");
    });
  });
};
export const updateCartItem = () => {
  handleUpdateQuantity();
  clickToUpdate();
};
export const deleteCartItem = () => {
  const del__btns = document.querySelectorAll(".cart__item--delete-btn");

  del__btns.forEach((btn, i) => {
    btn.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      await cartService.findOneAndDelete(id);
      loading(
        [
          [`sub__spin-${i}`, `show__fa-spin-item`],
          [`fa-spin-item-${i}`, `show__fa-spin-item`],
        ],
        { status: true }
      );
      setTimeout(() => {
        getCartItems();
        loading(
          [
            [`sub__spin-${i}`, `show__fa-spin-item`],
            [`fa-spin-item-${i}`, `show__fa-spin-item`],
          ],
          { status: false }
        );
      }, LOADING_SET_TIME_OUT);
    });
  });
};
export const getCartItems = async () => {
  const cart__element = document.querySelector(".cart__items");
  const cart__checkout = document.querySelector(".cart__checkout--container");
  const cart = await cartService.getAll();
  console.log(cart);
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
							<img src="${product?.image}" alt="">
							<div class="cart__item--content">
								<div class="cart__item--title">
									<span>Rockstar XD775...</span>
								</div>
								<div class="cart__item--price">
									<span>$ ${product?.product_price}</span>
								</div>
								<div class="cart__item--quantity">
									<p   data-id="${
                    product?.id
                  }" class="decrease__product--btn update__quantity--btn" data-type="0">-</p>
									<input type="number" class="update__quantity-input" value="${
                    product?.quantity
                  }" data-id="${product?.id}" >
									<p data-type="1" class="increase__product--btn update__quantity--btn" data-id="${
                    product?.id
                  }">+</p>
			
								</div>
							</div>
			
						</div>
						<div class="cart__item--delete-btn" data-id="${product?.id}">
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
								<p class="sub__total">$ ${await totalPrice()}</p>
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
								<b class="total__price">$ ${await totalPrice()}</b>
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
  updateCartItem();
  deleteCartItem();
  checkout();
  showQuantityProduct();
  createCartItem();
};
export const getCartItemById = async (id) => {
  const find_product_by_id = products.find(
    (product) => toInt(product?.id) == toInt(id)
  );
  const find_quantity_by_id = await cartService.findOneById(id);
  console.log(find_quantity_by_id);
  const quantities = cart?.reduce((prevItem, currentIem) => {
    prevItem += currentIem?.quantity;
    return prevItem;
  }, 0);
  const renderProduct = `
  <div class="modal__product">
						<img src="${find_product_by_id.image}" alt="">
						<div class="modal__product--p">
							<div class="modal__product--title">
								${find_product_by_id?.product_title}
							</div>
							<div class="modal__product--price">
								<span>$ ${find_product_by_id.product_price}</span> <span>Size: </span><b>S</b>
							</div>
							<div class="modal__product--quantity"><span>Quantity:</span><b>${
                find_quantity_by_id?.quantity
              }</b></div>
						</div>
						</div>
						<div class="modal__checkout">
						<div class="modal__checkout--quantity">
							There are ${quantities} items in your cart.
						</div>
						<div class="modal__checkout--total">
							Subtotal: $ ${await totalPrice()}
						</div>
						<div class="modal__checkout--quantity">
							Shipping: $0.00
						</div>
						<div class="modal__checkout--tax">
							Total (tax excl.) $0.00
						</div>
						<div class="modal__checkout--tax">Total (tax excl.) $236.84
						</div>
						<div class="modal__checkout--taxes">
							Taxes: $0.00
						</div>
						<div class="modal__checkout--btn">
							<span>CONTINUE SHOPPING</span><span>
								<i class="fa-solid fa-check"></i>
								PROCCED TO CHECKOUT
							</span>
						</div>
					</div>
					`;
  return renderProduct;
};
