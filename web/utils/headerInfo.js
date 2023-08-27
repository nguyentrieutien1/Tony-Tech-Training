import { getFromLocalStorage } from "./storage.js";

const headersInfo = () => {
  return {
    Authorization: `Bearer ${
      JSON.parse(getFromLocalStorage("accessToken")) || null
    }`,
    "x-client-id": JSON.parse(getFromLocalStorage("user_id")) || null,
    "Content-Type": "application/json",
  };
};
export { headersInfo };
