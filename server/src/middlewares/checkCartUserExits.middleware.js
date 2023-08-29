const { Cart } = require("../modules/cart/cart.model");

const checkCartUserExits = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const findCartUser = await Cart.findOne({ user: _id });
    const cartUser = new Cart({ user: _id });
    if (!findCartUser) {
      await cartUser.save();
      req.cartId = cartUser._id;
    } else {
      req.cartId = findCartUser?._id;
    }
    next();
  } catch (error) {}
};

module.exports = {
  checkCartUserExits,
};
