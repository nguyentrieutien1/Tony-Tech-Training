import { products } from "../data/products.js";

class Product {
  getAllProducts = () => {
    return products;
  };
}
export default new Product();
