const { Success, Ok } = require("../../core/success.response");
const { errorHandler } = require("../../helpers/handleError");
const cartProductService = require("./cartProduct.service");

class CartProductController {
  create = async (req, res) => {
    try {
      const payload = req.body;
      const { _id } = req.user;
      const product = await cartProductService.create({ payload, userId: _id });
      return new Success({
        message: "Cart item has been created !",
        data: product,
      }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  findOne = async (req, res) => {
    try {
      const { _id } = req.user;
      const product = await cartProductService.findOne({ userId: _id });
      return new Ok({ data: product }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  findOneAndUpdate = async (req, res) => {
    try {
      const { _id } = req.user;
      const { id } = req.params;
      const payload = req.body;
      const product = await cartProductService.findOneAndUpdate({
        userId: _id,
        payload,
        productId: id,
      });
      return new Ok({ data: product }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  findOneAndDelete = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await cartProductService.findOneAndDelete({
        itemId: id,
      });
      return new Ok({ data: result }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
}
module.exports = new CartProductController();
