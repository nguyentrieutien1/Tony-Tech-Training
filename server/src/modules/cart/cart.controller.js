const { Ok, Success } = require("../../core/success.response");
const cartService = require("./cart.service");
const { errorHandler } = require("../../helpers/handleError");
class CartController {
  findAll = async (req, res) => {
    const products = await cartService.findAll();
    return new Ok({
      data: products,
      message: "Get all product successful !",
    }).send(res);
  };
  create = async (req, res) => {
    try {
      const payload = req.body;
      const { _id } = req.user;
      const product = await cartService.create({ payload, userId: _id });
      return new Success({
        message: "Cart item has been created !",
        data: product,
      }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  findOneById = async (req, res) => {
    const { _id } = req.user;
    const product = await cartService.findOneById({ userId: _id });
    return new Ok({ data: product }).send(res);
  };
  findOneAndUpdate = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const product = await cartService.findOneAndUpdate({
      id,
      payload,
    });
    return new Ok({
      data: product,
      message: "Update product successful !",
    }).send(res);
  };
  findOneAndDelete = async (req, res) => {
    const { id } = req.params;
    await cartService.findOneAndDelete({ id });
    return new Ok({ message: "Delete product successful !" }).send(res);
  };
}
module.exports = new CartController();
