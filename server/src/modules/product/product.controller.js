const { Ok } = require("../../core/success.response");
const productService = require("./product.service");
class ProductController {
  static findAll = async (req, res) => {
    const products = await productService.findAll();
    return new Ok({
      data: products,
      message: "Get all product successful !",
    }).send(res);
  };
}
module.exports = { ProductController };
