const { Unauthorized } = require("../core/error.response");
const { errorHandler } = require("../helpers/handleError");
const { CartProduct } = require("../modules/cart-product/cart-product.model");
const { Cart } = require("../modules/cart/cart.model");

const checkCartPermission = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const cart = await Cart.findOne({ user: _id });
    if (!cart) throw new Unauthorized();
    const cartItem = await CartProduct.findOne({ product: id, cart: cart._id });
    if (!cartItem) throw new Unauthorized();
    return next();
  } catch (error) {
    errorHandler(error);
  }
};
module.exports = {
  checkCartPermission,
};
