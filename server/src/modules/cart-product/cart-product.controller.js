const { Success, Ok } = require("../../core/success.response");
const { errorHandler } = require("../../helpers/handleError");
const { CartProductSerice } = require("./cart-product.service");

class CartProductController {
  static create = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const cartId = req.cartId;
      const product = await CartProductSerice.create({
        productId,
        quantity,
        cartId,
      });
      return new Success({
        message: "Cart item has been created !",
        data: product,
      }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  static findOneAndUpdate = async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      const product = await CartProductSerice.findOneAndUpdate({
        quantity,
        cartItemId: id,
      });
      return new Ok({ data: product }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  static findOneAndDelete = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await CartProductSerice.findOneAndDelete({
        cartItemId: id,
      });
      return new Ok({ data: result }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
}
module.exports = {
  CartProductController,
};
