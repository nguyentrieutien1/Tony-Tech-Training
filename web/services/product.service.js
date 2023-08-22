import { products } from "../data/products.js";

class Product {
  getAllProducts = async () => {
    return [...products];
  };
}
export default new Product();
