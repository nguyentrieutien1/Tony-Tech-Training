import { getFromLocalStorage } from "./storage";

const headersInfo = () => {
  return {
    Authorization: `Bearer ${
      JSON.parse(getFromLocalStorage("accessToken")) || null
    }`,
    "Content-Type": "application/json",
  };
};
export { headersInfo };
