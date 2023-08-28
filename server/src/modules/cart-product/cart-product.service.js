const { BadRequestError, NotFound } = require("../../core/error.response");
const { Cart } = require("../cart/cart.model");
const { CartProduct } = require("./cart-product.model");

class CartProductSerice {
  static create = async ({ productId, quantity, userId }) => {
    if (!productId || !quantity) {
      throw new BadRequestError("Dont't have payload");
    }
    const findCartUser = await Cart.findOne({ user: userId });
    const cartUser = new Cart({ user: userId });
    if (!findCartUser) {
      await cartUser.save();
    }
    const cartProduct = await CartProduct.create({
      cart: !findCartUser ? cartUser?._id : findCartUser?._id,
      product: productId,
      quantity: quantity,
    });
    return cartProduct;
  };
  static findOneAndUpdate = async ({ quantity, productId, userId }) => {
    const { _id } = await Cart.findOne({ user: userId });
    const product = await CartProduct.findOne({
      product: productId,
      cart: _id,
    });
    if (!product) throw new NotFound("Item in cart not found !");
    product.quantity = quantity;
    return await product.save();
  };
  static findOneAndDelete = async ({ itemId, userId }) => {
    const { _id } = await Cart.findOne({ user: userId });
    const product = await CartProduct.findOneAndDelete({
      product: itemId,
      cart: _id,
    });
    if (!product) throw new NotFound("Cart item not found in your cart !");
    return product;
  };
}
module.exports = {
  CartProductSerice,
};
