const router = require("express").Router();
const { checkAuth } = require("../middlewares/auth.middleware");
const { ProductController } = require("../modules/product/product.controller");
router.get("/", checkAuth, ProductController.findAll);
module.exports = router;
