const { BadRequestError, NotFound } = require("../../core/error.response");
const { Cart } = require("../cart/cart.model");
const { CartProduct } = require("./cartProduct.model");

class CartProductSerice {
  create = async ({ payload, userId }) => {
    if (!payload) {
      throw new BadRequestError("Dont't have payload");
    }
    const findCartUser = await Cart.findOne({ user: userId });
    if (!findCartUser) {
      const cartUser = new Cart({ user: userId });
      await cartUser.save();
    }
    const cartProduct = await CartProduct.create({
      cart: !findCartUser ? cartUser?._id : findCartUser?._id,
      product: payload?.id,
      quantity: payload?.quantity,
    });
      return cartProduct;
  };
  findOne = async ({ userId }) => {
    if (!userId) throw new BadRequestError("Missing user id");
    const { _id } = await Cart.findOne({ user: userId });
    const order = await CartProduct.find({ cart: _id }).populate({
      path: "product",
    });
    return order;
  };
  findOneAndUpdate = async ({ payload, productId }) => {
    const product = await CartProduct.findOne({ product: productId });
    if (!product) throw new NotFound("Item in cart not found !");
    product.quantity = payload?.quantity;
    return await product.save();
  };
  findOneAndDelete = async ({ itemId }) => {
    const product = await CartProduct.findOneAndDelete({ product: itemId });
    if (!product) throw new NotFound("Cart item not found in your cart !");
    return product;
  };
}
module.exports = new CartProductSerice();
