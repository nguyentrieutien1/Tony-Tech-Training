const { CartProduct } = require("../cart-product/cart-product.model");
const { BadRequestError, NotFound } = require("../../core/error.response");
const { Cart } = require("./cart.model");
class CartService {
  // static findAll = async () => {
  //   const cart = await Cart.find();
  //   return cart;
  // };
  // static create = async ({ payload, userId }) => {
  //   if (!payload) {
  //     throw new BadRequestError("Dont't have payload");
  //   }
  //   const findCartUser = await Cart.findOne({ user: userId });
  //   if (!findCartUser) {
  //     const cartUser = new Cart({ user: userId });
  //     await cartUser.save();
  //   }
  //   const cartProduct = await CartProduct.create({
  //     cart: !findCartUser ? cartUser?._id : findCartUser?._id,
  //     product: payload?.id,
  //     quantity: payload?.quantity,
  //   });
  //   return cartProduct;
  // };
  static findOneByUserId = async ({ userId }) => {
    if (!userId) throw new BadRequestError("Missing user id");
    const cartUser = await Cart.findOne({ user: userId });
    if (!cartUser) {
      return [];
    }
    const order = await CartProduct.find({ cart: cartUser._id }).populate({
      path: "product",
    });
    return order;
  };
  // static findOneAndUpdate = async ({ id, payload }) => {
  //   if (!id || !payload)
  //     throw new BadRequestError("Missing cart item or payload");
  //   const cartItem = await Cart.findOneAndUpdate({ id }, payload);
  //   return cartItem;
  // };

  // static findOneAndDelete = async ({ id }) => {
  //   if (!id) throw new BadRequestError("Missing cart item  id or payload");
  //   await Cart.findOneAndDelete({ id });
  //   return 1;
  // };
}
module.exports = {
  CartService,
};
