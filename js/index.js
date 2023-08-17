const menu_btns = document.querySelectorAll(".menu");
const header__top = document.querySelector(".header__top");
const container = document.querySelector(".container");
const header__nav = document.querySelector(".header__nav--bottom");
const header__nav_top = document.querySelector(".header__nav--top");
const close__btn = document.querySelector(".fa-circle-xmark");
const body = document.querySelector("body");
// START TOGGLE MENU SIDEBAR
menu_btns.forEach((menu__btn) => {
  menu__btn.addEventListener("click", () => {
    header__top.style.display = "block";
  });
});
close__btn.addEventListener("click", () => {
  header__top.style.display = "none";
});
// END TOGGLE MENU SIDEBAR