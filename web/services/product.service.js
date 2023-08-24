import { API_URL } from "../constants/apiUrl.js";

class Product {
  getAllProducts = async () => {
    const products = await fetch(`${API_URL}/products`);
    const { data } = await products.json();
    return data;
  };
}
export default new Product();
