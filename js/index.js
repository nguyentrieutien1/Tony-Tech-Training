const menu_btns = document.querySelectorAll(".menu");
const header__top = document.querySelector(".header__top");
const container = document.querySelector(".container");
const header__nav = document.querySelector(".header__nav--bottom");
const header__nav_top = document.querySelector(".header__nav--top");
const close__btn = document.querySelector(".fa-circle-xmark");
const body = document.querySelector("body");
menu_btns.forEach((menu__btn) => {
  menu__btn.addEventListener("click", () => {
    header__top.style.display = "block";
    container.classList.add("overlay");
    header__nav.classList.add("hidden__header");
    header__nav_top.classList.add("hidden__header");
  });
});
close__btn.addEventListener("click", () => {
  header__top.style.display = "none";
  container.classList.remove("overlay");
  header__nav.classList.remove("hidden__header");
  header__nav_top.classList.remove("hidden__header");
});
