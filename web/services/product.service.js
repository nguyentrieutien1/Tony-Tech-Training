import { API_URL } from "../constants/apiUrl.js";
import { headersInfo } from "./../utils/headerInfo.js";
class ProductService {
  getAllProducts = async () => {
    const products = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: headersInfo(),
    });
    const { data } = await products.json();
    return data;
  };
}
export default new ProductService();
