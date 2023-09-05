const { Ok, Success } = require("../../core/success.response");
const { CartService } = require("./cart.service");
const { errorHandler } = require("../../helpers/handleError");
class CartController {
  // static findAll = async (req, res) => {
  //   const products = await CartService.findAll();
  //   return new Ok({
  //     data: products,
  //     message: "Get all product successful !",
  //   }).send(res);
  // };
  // static create = async (req, res) => {
  //   try {
  //     const payload = req.body;
  //     const { _id } = req.user;
  //     const product = await CartService.create({ payload, userId: _id });
  //     return new Success({
  //       message: "Cart item has been created !",
  //       data: product,
  //     }).send(res);
  //   } catch (error) {
  //     errorHandler(error, res);
  //   }
  // };
  static findOneByUserId = async (req, res) => {
    const { _id } = req.user;
    const product = await CartService.findOneByUserId({ userId: _id });
    return new Ok({ data: product }).send(res);
  };
  // static findOneAndUpdate = async (req, res) => {
  //   const { id } = req.params;
  //   const payload = req.body;
  //   const product = await CartService.findOneAndUpdate({
  //     id,
  //     payload,
  //   });
  //   return new Ok({
  //     data: product,
  //     message: "Update product successful !",
  //   }).send(res);
  // };
  // static findOneAndDelete = async (req, res) => {
  //   const { id } = req.params;
  //   await CartService.findOneAndDelete({ id });
  //   return new Ok({ message: "Delete product successful !" }).send(res);
  // };
}
module.exports = { CartController };
