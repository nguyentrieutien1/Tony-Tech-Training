const router = require("express").Router();
const { checkAuth } = require("../middlewares/auth.middleware");
const productController = require("../modules/product/product.controller");
router.get("/", checkAuth, productController.findAll);
module.exports = router;
