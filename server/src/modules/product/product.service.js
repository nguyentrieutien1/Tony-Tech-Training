const { Product } = require("./product.model");

class ProductService {
  findAll = async () => {
    const products = await Product.find();
    return products;
  };
}
module.exports = new ProductService();
