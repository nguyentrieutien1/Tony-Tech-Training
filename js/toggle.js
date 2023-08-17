const menu_btns = document.querySelectorAll(".menu");
const header__top = document.querySelector(".header__top");
const container = document.querySelector(".container");
const header__nav = document.querySelector(".header__nav--bottom");
const header__nav_top = document.querySelector(".header__nav--top");
const close__btn = document.querySelector(".fa-circle-xmark");
const body = document.querySelector("body");
var element = document.querySelector(".sidebar-toggle-label");
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
// END TOGGLE MENU SIDEBAR
