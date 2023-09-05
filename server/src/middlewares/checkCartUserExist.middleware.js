const { Cart } = require("../modules/cart/cart.model");

const checkCartUserExist = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const findCartUser = await Cart.findOne({ user: _id });
    if (!findCartUser) {
      const cartUser = new Cart({ user: _id });
      await cartUser.save();
      req.cartId = cartUser._id;
    } else {
      req.cartId = findCartUser?._id;
    }
    next();
  } catch (error) {
    errorHandler(error);
  }
};

module.exports = {
  checkCartUserExist,
};
