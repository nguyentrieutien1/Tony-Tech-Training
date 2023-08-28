const router = require("express").Router();
const { checkAuth } = require("../middlewares/auth.middleware");
const cartProductController = require("../modules/CartProduct/cartProduct.controller");
router.post("/cart_products/my", checkAuth, cartProductController.create);
router.get("/cart_products/my", checkAuth, cartProductController.findOne);
router.put(
  "/cart_products/:id",
  checkAuth,
  cartProductController.findOneAndUpdate
);
router.delete("/cart_products/:id", cartProductController.findOneAndDelete);
module.exports = router;
