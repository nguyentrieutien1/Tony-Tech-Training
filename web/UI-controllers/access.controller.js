import { API_URL } from "../constants/apiUrl.js";
import { headersInfo } from "../utils/headerInfo.js";
import {
  removeFromLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "../utils/storage.js";
const signIn = async () => {
  const email__element = document.querySelector(".signin__form  #email");
  const password__element = document.querySelector(".signin__form  #password");
  const submit__btn = document.querySelector(".signin__form  .btn-signin");
  console.log(submit__btn);
  submit__btn.addEventListener("click", async function (e) {
    e.preventDefault();
    const result = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email__element.value,
        password: password__element.value,
      }),
    });
    const { status } = result;
    const json = await result.json();
    const { accessToken, refreshToken, user_id } = json.data;
    if (status === 201) {
      saveToLocalStorage("accessToken", accessToken);
      saveToLocalStorage("refreshToken", refreshToken);
      saveToLocalStorage("user_id", user_id);
      saveToLocalStorage("status", 1);
      window.location.href = "./index.html";
    }
  });
};
const signUp = async () => {
  const email__element = document.querySelector(".signup__form  #email");
  const password__element = document.querySelector(".signup__form  #password");
  const submit__btn = document.querySelector(".signup__form  .btn-signup");
  submit__btn.addEventListener("click", async function (e) {
    e.preventDefault();
    const result = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email__element.value,
        password: password__element.value,
      }),
    });
    const { status } = result;
    if (status == 201) {
      return (window.location.href = "./login.html");
    }
    const data = await result.json();
    const { message } = data;
    alert(message);
  });
};
const checkIsLogin = () => {
  const status = getFromLocalStorage("status") || false;
  if (status) {
    window.location.href = "./index.html";
  }
};

const main = () => {
  checkIsLogin();
  signIn();
  signUp();
};
main();
