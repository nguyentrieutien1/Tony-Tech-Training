import { API_URL } from "../constants/apiUrl.js";
import { getFromLocalStorage, saveToLocalStorage } from "./../utils/storage.js";
export const loading = (array, { status }) => {
  array.forEach((item) => {
    const [className, animationName] = item;
    const className_element = document.querySelector(`.${className}`);
    if (status) {
      className_element?.classList.add(animationName);
      return void 0;
    }
    className_element?.classList.remove(animationName);
  });
};

(() => {
  const menu_btns = document.querySelectorAll(".menu");
  const header__top = document.querySelector(".header__top");
  const close__btn = document.querySelector(".fa-circle-xmark");
  const element = document.querySelector(".sidebar-toggle-label");
  const modal__body = document.querySelector(".modal__body");
  const modal__container = document.querySelector(".modal__container");
  const cart__icon = document.querySelector(".cart__icon .fa-cart-plus");
  const cart = document.querySelector(".cart__icon");
  const cart__container = document.querySelector(".cart__container");
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
})();
const showContent = () => {
  const content = document.querySelector(".main__content");
  const loginForm = document.querySelector("form");
  const loginStatus = getFromLocalStorage("status") || false;
  console.log(loginStatus);
  if (loginStatus != 1) {
    content.style.display = "none";
    loginForm.style.display = "block";
  } else {
    content.style.display = "block";
    loginForm.style.display = "none";
  }
};
(() => {
  showContent();
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const login_btn = document.querySelector(".login-btn");
  login_btn.addEventListener("click", async () => {
    const result = await fetch(`${API_URL}/signin`, {
      method: "POST",
      body: JSON.stringify({ email: email.value, password: password.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await result.json();
    const { accessToken, refreshToken, user_id } = data;
    saveToLocalStorage("accessToken", accessToken);
    saveToLocalStorage("refreshToken", refreshToken);
    saveToLocalStorage("user_id", user_id);
    saveToLocalStorage("status", 1);
    window.document.location.reload();
  });
})();
