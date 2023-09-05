import { AuthService } from "../services/auth.service.js";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage.js";
const signIn = async () => {
  const email__element = document.querySelector(".signin__form  #email");
  const password__element = document.querySelector(".signin__form  #password");
  const submit__btn = document.querySelector(".signin__form  .btn-signin");
  submit__btn?.addEventListener("click", async function (e) {
    const result = await AuthService.signIn({
      email: email__element.value,
      password: password__element.value,
    });
    const { status } = result;
    const json = await result.json();
    if (status === 201) {
      const { accessToken, refreshToken, user_id } = json.data;
      saveToLocalStorage("accessToken", accessToken);
      saveToLocalStorage("status", 1);
      window.location.href = "./index.html";
      return void 0;
    }
    const { message } = json;
    alert(message);
  });
};
const signUp = async () => {
  const email__element = document.querySelector(".signup__form  #email");
  const password__element = document.querySelector(".signup__form  #password");
  const submit__btn = document.querySelector(".signup__form  .btn-signup");
  submit__btn.addEventListener("click", async function () {
    const result = await AuthService.signUp({
      email: email__element.value,
      password: password__element.value,
    });
    const { status } = await result.json();
    if (status == 201) {
      return (window.location.href = "./signin.html");
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
