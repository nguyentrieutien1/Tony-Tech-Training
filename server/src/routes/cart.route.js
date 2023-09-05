const router = require("express").Router();
const { checkAuth } = require("../middlewares/auth.middleware");
const { CartController } = require("../modules/cart/cart.controller");
router.get("/my_cart", checkAuth, CartController.findOneByUserId);
module.exports = router;
