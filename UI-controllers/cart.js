import { saveToLocalStorage } from "../helpers/storage.helper.js";
import { toInt } from "../utils/covertToInt.js";
import { LOADING_SET_TIME_OUT } from "../contains/number_setTimeOut.js";
import { PRODUCT_KEY } from "../contains/key_name.js";
import { handleUpdateQuantity } from "./../js/focusToChangeQuantity.js";
import { totalPrice } from "../helpers/total_price.helper.js";
import { cart } from "../global/state.js";
import { cart as cart__state } from "../global/state.js";
import { loading } from "../helpers/loading.helper.js";
import ProductService from "./../services/ProductServices.js";
import { products } from "../data/products.js";
import { handleIncrement } from "../js/increaseProduct.js";
import { handleDecrement } from "../js/decreaseProduct.js";
import { checkout } from "../js/checkout.js";
import { showQuantityProduct } from "../js/showQuantityProduct.js";
export const createCartItem = () => {
  const shopping_btns = document.querySelectorAll(".fa-cart-shopping");
  const modal__container = document.querySelector(".modal__container");
  const modal__checkout = document.querySelector(".modal__checkout--total");
  const modal__content = document.querySelector(".modal__content");
  const modal__body = document.querySelector(".modal__body");
  shopping_btns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      console.log("NGUYEN THANH TUNG");
      const spin = document.querySelector(`.fa-spin-${index}`);
      console.log(spin);
      spin.style.display = "block";
      setTimeout(() => {
        const product_id = toInt(this?.getAttribute("data-id"));
        const product = cart?.find(
          (product) => toInt(product?.id) == toInt(product_id)
        );
        if (product) {
          product.quantity += 1;
        } else {
          cart?.push({ id: product_id, quantity: 1 });
        }
        saveToLocalStorage(PRODUCT_KEY, cart);
        getCartItems();
        modal__container?.classList?.add("show__modal");
        spin.style.display = "none";
        modal__checkout.innerHTML = `
							Subtotal: $ ${totalPrice({ id: product_id })}
						`;
        modal__content.innerHTML = getCartItemById(product_id);
        modal__body.classList?.add("show__modal--body");
      }, LOADING_SET_TIME_OUT);
    });
  });
};
export const updateCartItem = (index_product, index_spin, { type, value }) => {
  console.log(index_product, index_spin, type, value);
  const quantity = cart__state[index_product]?.quantity;
  let payload = type === 0 ? quantity - 1 : type === 1 ? quantity + 1 : value;
  if (payload <= 1) {
    payload = 1;
  }
  const { cart } = ProductService.findOneAndUpdate(index_product, payload);
  saveToLocalStorage(PRODUCT_KEY, cart);
  loading(
    [
      [`sub__spin-${index_spin}`, `show__fa-spin-item`],
      [`fa-spin-item-${index_spin}`, `show__fa-spin-item`],
    ],
    { status: true }
  );
  setTimeout(() => {
    getCartItems();
    loading(
      [
        [`sub__spin-${index_spin}`, `show__fa-spin-item`],
        [`fa-spin-item-${index_spin}`, `show__fa-spin-item`],
      ],
      { status: false }
    );
  }, LOADING_SET_TIME_OUT);
};
export const deleteCartItem = () => {
  const del__btns = document.querySelectorAll(".cart__item--delete-btn");

  del__btns.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const index = cart__state?.findIndex(
        (product) => toInt(product?.id) == toInt(id)
      );
      const { cart } = ProductService.findOneAndDelete(index);
      loading(
        [
          [`sub__spin-${i}`, `show__fa-spin-item`],
          [`fa-spin-item-${i}`, `show__fa-spin-item`],
        ],
        { status: true }
      );
      setTimeout(() => {
        saveToLocalStorage(PRODUCT_KEY, cart);
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
export const getCartItems = () => {
  const cart__element = document.querySelector(".cart__items");
  const cart__checkout = document.querySelector(".cart__checkout--container");
  const findProducts = cart__state?.map((product) => {
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
  deleteCartItem();
  checkout();
  showQuantityProduct();
};
export const getCartItemById = (id) => {
  const find_product_by_id = products.find(
    (product) => toInt(product?.id) == toInt(id)
  );
  const find_quantity_by_id = cart?.find(
    (product) => toInt(product?.id) == toInt(id)
  );
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
							Subtotal: $ ${totalPrice()}
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