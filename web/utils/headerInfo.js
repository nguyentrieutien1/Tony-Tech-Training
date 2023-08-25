import { getFromLocalStorage } from "./storage.js";

const headersInfo = () => {
  return {
    Authorization: `Bearer ${JSON.parse(getFromLocalStorage("accessToken"))}`,
    "x-client-id": JSON.parse(getFromLocalStorage("user_id")),
    "Content-Type": "application/json",
  };
};
export { headersInfo };
