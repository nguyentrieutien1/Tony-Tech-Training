import { Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware";
import { CartProductsController } from "../modules/cart-products/cart-products.controller";
import { checkCartUserExits } from "../middlewares/checkCartUserExits.middleware";
import { checkCartPermission } from "../middlewares/checkCartPermission.middleware";
const router: Router = Router();
router.post("/", checkAuth, checkCartUserExits, CartProductsController.create);
router.put(
  "/:id",
  checkAuth,
  checkCartPermission,
  CartProductsController.findByIdAndUpdate
);
router.delete(
  "/:id",
  checkAuth,
  checkCartPermission,
  CartProductsController.findByIdAndDelete
);
export default router;
