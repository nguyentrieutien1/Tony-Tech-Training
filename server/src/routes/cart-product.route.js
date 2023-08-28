const router = require("express").Router();
const {
  CartProductController,
} = require("../modules/cart-product/cart-product.controller");
const { checkAuth } = require("../middlewares/auth.middleware");
const {
  checkCartPermission,
} = require("../middlewares/checkCartPermission.middleware");

router.post("/", checkAuth, CartProductController.create);
router.put(
  "/:id",
  checkAuth,
  checkCartPermission,
  CartProductController.findOneAndUpdate
);
router.delete(
  "/:id",
  checkAuth,
  checkCartPermission,
  CartProductController.findOneAndDelete
);
module.exports = router;
