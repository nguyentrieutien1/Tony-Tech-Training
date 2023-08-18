const menu_btns = document.querySelectorAll(".menu");
const header__top = document.querySelector(".header__top");
const container = document.querySelector(".container");
const header__nav = document.querySelector(".header__nav--bottom");
const header__nav_top = document.querySelector(".header__nav--top");
const close__btn = document.querySelector(".fa-circle-xmark");
const body = document.querySelector("body");
var element = document.querySelector(".sidebar-toggle-label");
const modal__body = document.querySelector(".modal__body");
const modal__container = document.querySelector(".modal__container");
const cart__icon = document.querySelector(".cart__icon .fa-cart-plus");
const cart = document.querySelector(".cart__icon");
const cart__container = document.querySelector(".cart__container");
const cart__amout = document.querySelector(".amount");
const close_cart_icon = document.querySelector(".cart__icon .xmark");
// START TOGGLE MENU SIDEBAR
menu_btns.forEach((menu__btn) => {
  menu__btn.addEventListener("click", () => {
    header__top.style.display = "block";
    element.style.opacity = 1;
    element.style.zIndex = 99999;
  });
});

close__btn.addEventListener("click", () => {
  header__top.style.display = "none";
  element.style.opacity = 0;
  element.style.zIndex = -1;
});

// DISABLE THE MODAL
modal__body.addEventListener("click", () => {
  console.log(123);
  modal__body.classList.remove("show__modal--body");
  modal__container.classList.remove("show__modal");
});

// SHOW CART
cart__icon.addEventListener("click", function () {
  cart__container.classList.add("show__cart--container");
  cart.classList.add("position__cart--icon");
  close_cart_icon.style.display = "block";
});

// CLOSE CART
close_cart_icon.addEventListener("click", function () {
  cart__container.classList.remove("show__cart--container");
  close_cart_icon.style.display = "none";
  cart.classList.remove("position__cart--icon");
});