import { LINK } from "../constants/url_link.js";

class Product {
  getAllProducts = async () => {
    const products = await fetch(`${LINK}/products`);
    const { metadata } = await products.json();
    return metadata;
  };
}
export default new Product();
