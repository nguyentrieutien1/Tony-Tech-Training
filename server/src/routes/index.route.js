const cartRouter = require("./cart.route");
const productRouter = require("./product.route");
const userRouter = require("./user.route");
const cartProductRouter = require("./cart_product");
const router = (app) => {
  app.use("/api/cart", cartRouter);
  app.use("/api/products", productRouter);
  app.use("/api", userRouter);
  app.use("/api", cartProductRouter);
};
module.exports = router;
