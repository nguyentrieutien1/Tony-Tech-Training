const router = require("express").Router();
const { checkAuth } = require("../middlewares/auth.middleware");
const CartController = require("../modules/cart/cart.controller");
router.get("/", CartController.findAll);
router.get("/my_cart", checkAuth, CartController.findOneById);
router.post("/", checkAuth, CartController.create);
router.put("/:id", checkAuth, CartController.findOneAndUpdate);
router.delete("/:id", checkAuth, CartController.findOneAndDelete);
module.exports = router;
