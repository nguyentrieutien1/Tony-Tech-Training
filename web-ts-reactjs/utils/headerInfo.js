import { getFromLocalStorage } from "./storage.js";

const headersInfo = () => {
  return {
    Authorization: `Bearer ${
      JSON.parse(getFromLocalStorage("accessToken") || null) || null
    }`,
    "Content-Type": "application/json",
  };
};
export { headersInfo };
