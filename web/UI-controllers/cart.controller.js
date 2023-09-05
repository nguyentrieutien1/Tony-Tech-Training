import { toInt } from "../utils/covertToInt.js";
import { totalPrice } from "../utils/totalPrice.js";
import cartService from "../services/cart.service.js";
import { cartState, productState } from "../global/state.js";
import { loading } from "./common.controller.js";

export const createCartItem = () => {
  try {
    const shopping_btns = document.querySelectorAll(".fa-cart-shopping");
    const modal__container = document.querySelector(".modal__container");
    const modal__checkout = document.querySelector(".modal__checkout--total");
    const modal__content = document.querySelector(".modal__content");
    const modal__body = document.querySelector(".modal__body");
    shopping_btns.forEach((btn, index) => {
      btn.addEventListener("click", async function (e) {
        const spin = document.querySelector(`.fa-spin-${index}`);
        spin.style.display = "block";
        const productId = this?.getAttribute("data-id");
        await cartService.createOrUpdate(productId);
        await getCartItems(productId, modal__content);
        modal__container?.classList?.add("show__modal");
        spin.style.display = "none";
        modal__checkout.innerHTML = `
							Subtotal: $ ${await totalPrice({ id: productId })}
						`;

        modal__body.classList?.add("show__modal--body");
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const listenUpdateCartItem = () => {
  focusToUpdate();
  clickToUpdate();
};

export const listenDeleteCartItem = () => {
  const del__btns = document.querySelectorAll(".cart__item--delete-btn");
  del__btns.forEach((btn, i) => {
    btn.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      loading(
        [
          [`sub__spin-${i}`, `show__fa-spin-item`],
          [`fa-spin-item-${i}`, `show__fa-spin-item`],
        ],
        { status: true }
      );
      await cartService.findOneAndDelete(id);
      const index = cartState.findIndex((cartItem) => cartItem?._id == id);
      cartState.splice(index, 1);
      getCartItems();
      loading(
        [
          [`sub__spin-${i}`, `show__fa-spin-item`],
          [`fa-spin-item-${i}`, `show__fa-spin-item`],
        ],
        { status: false }
      );
    });
  });
};

export const getCartItems = async (productId, element) => {
  const cart__element = document.querySelector(".cart__items");
  const cart__checkout = document.querySelector(".cart__checkout--container");
  const cart = cartState;
  const renderedProduct = cart?.map((cartItem, index) => {
    return `
    <div class="cart__item">
						<div class="cart__item--info">
							<div class="sub__spin sub__spin-${index}"></div>
						<i class="fa-solid fa-spinner fa-spin fa-spin-item ${`fa-spin-item-${index}`}"></i>
							<img src="${cartItem?.product?.image}" alt="">
							<div class="cart__item--content">
								<div class="cart__item--title">
									<span>Rockstar XD775...</span>
								</div>
								<div class="cart__item--price">
									<span>$ ${cartItem?.product?.product_price}</span>
								</div>
								<div class="cart__item--quantity">
									<p   data-id="${
                    cartItem?._id
                  }" class="decrease__product--btn update__quantity--btn" data-type="0">-</p>
									<input type="number" class="update__quantity-input" value="${
                    cartItem?.quantity
                  }" data-id="${cartItem?._id}" >
									<p data-type="1" class="increase__product--btn update__quantity--btn" data-id="${
                    cartItem?._id
                  }">+</p>
			
								</div>
							</div>
			
						</div>
						<div class="cart__item--delete-btn" data-id="${cartItem?._id}">
							<i class="fa-solid fa-xmark"></i>
						</div>
			
          </div>
          
          `;
  });
  const renderedCartCheckout =
    cart?.length > 0
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
  cart__element.innerHTML = renderedProduct?.join(" ");
  cart__checkout.innerHTML = renderedCartCheckout;
  if (productId) {
    element.innerHTML = await getCartItemById(productId);
  }
  listenUpdateCartItem();
  listenDeleteCartItem();
  listenCheckout();
  listenQuantityCartItem();
};

export const getCartItemById = async (id) => {
  const find_product_byid = productState.find((product) => product?._id == id);
  const find_quantity_byid = cartState.find(
    (cartItem) => cartItem?.product?._id == id
  );
  const quantities = cartState?.reduce((prevItem, currentItem) => {
    prevItem += currentItem?.quantity;
    return prevItem;
  }, 0);
  const renderProduct = `
  <div class="modal__product">
						<img src="${find_product_byid?.image}" alt="">
						<div class="modal__product--p">
							<div class="modal__product--title">
								${find_product_byid?.product_title}
							</div>
							<div class="modal__product--price">
								<span>$ ${find_product_byid?.product_price}</span> <span>Size: </span><b>S</b>
							</div>
							<div class="modal__product--quantity"><span>Quantity:</span><b>${
                find_quantity_byid?.quantity || 1
              }</b></div>
						</div>
						</div>
						<div class="modal__checkout">
						<div class="modal__checkout--quantity">
							There are ${quantities} items in your cart.
						</div>
						<div class="modal__checkout--total">
							Subtotal: $ ${await totalPrice(null)}
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

const listenCheckout = async () => {
  const total = await totalPrice(null);
  const total__price = document.querySelector(".total__price");
  const sub__total = document.querySelector(".sub__total");
  sub__total ? (sub__total.textContent = `$ ${total}`) : null;
  total__price ? (total__price.textContent = `$ ${total}`) : null;
};
const clickToUpdate = () => {
  const update_quantity_buttons = document.querySelectorAll(
    ".update__quantity--btn"
  );
  update_quantity_buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const type = this.getAttribute("data-type");
      updateQuantityCartItem(id, { type });
    });
  });
};
const focusToUpdate = () => {
  const increase_quantity_buttons = document.querySelectorAll(
    ".update__quantity-input"
  );
  increase_quantity_buttons.forEach((btn) => {
    btn.addEventListener("blur", function () {
      const id = this.getAttribute("data-id");
      const value = toInt(this.value);
      updateQuantityCartItem(id, { type: 2, value });
    });
  });
};

const listenQuantityCartItem = async () => {
  const quantityElement = document.querySelector(".cart__icon .amount");
  const quantities = cartState?.reduce((prevItem, currentIem) => {
    prevItem += currentIem?.quantity;
    return prevItem;
  }, 0);
  quantityElement.textContent = quantities;
};
const updateQuantityCartItem = async (id, { type, value }) => {
  const product = cartState.find((cart) => cart?._id == id);
  const index_spin = cartState.findIndex((p) => p?._id == id);
  const quantity = product?.quantity;
  let payload = type == 0 ? quantity - 1 : type == 1 ? quantity + 1 : value;
  if (payload <= 1) {
    payload = 1;
  }
  cartState[index_spin].quantity = payload;
  loading(
    [
      [`sub__spin-${index_spin}`, `show__fa-spin-item`],
      [`fa-spin-item-${index_spin}`, `show__fa-spin-item`],
    ],
    { status: true }
  );
  await cartService.findOneAndUpdate(id, payload);
  getCartItems();
  loading(
    [
      [`sub__spin-${index_spin}`, `show__fa-spin-item`],
      [`fa-spin-item-${index_spin}`, `show__fa-spin-item`],
    ],
    { status: false }
  );
};
