const { BadRequestError, NotFound } = require("../../core/error.response");
const { CartProduct } = require("./cart-product.model");

class CartProductSerice {
  static create = async ({ productId, quantity, cartId }) => {
    if (!productId || !quantity) {
      throw new BadRequestError("Dont't have payload");
    }
    const cartProduct = await CartProduct.create({
      cart: cartId,
      product: productId,
      quantity: quantity,
    });
    return cartProduct;
  };
  static findOneAndUpdate = async ({ quantity, cartItemId }) => {
    const product = await CartProduct.findById(cartItemId);
    product.quantity = quantity;
    return await product.save();
  };
  static findOneAndDelete = async ({ cartItemId }) => {
    const product = await CartProduct.findByIdAndDelete(cartItemId);
    if (!product) throw new NotFound("Cart item not found in your cart !");
    return product;
  };
}
module.exports = {
  CartProductSerice,
};
