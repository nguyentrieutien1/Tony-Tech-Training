const { Success, Ok } = require("../../core/success.response");
const { errorHandler } = require("../../helpers/handleError");
const { CartProductSerice } = require("./cart-product.service");

class CartProductController {
  static create = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const { _id } = req.user;
      const product = await CartProductSerice.create({
        productId,
        quantity,
        userId: _id,
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
      const { _id } = req.user;
      const { id } = req.params;
      const { quantity } = req.body;
      const product = await CartProductSerice.findOneAndUpdate({
        userId: _id,
        quantity,
        productId: id,
      });
      return new Ok({ data: product }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  static findOneAndDelete = async (req, res) => {
    try {
      const { _id } = req.user;
      const { id } = req.params;
      const result = await CartProductSerice.findOneAndDelete({
        itemId: id,
        userId: _id,
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
