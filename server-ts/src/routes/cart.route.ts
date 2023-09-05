import { Router } from "express";
import { CartController } from "../modules/cart/cart.controller";
import { checkAuth } from "../middlewares/auth.middleware";

const router: Router = Router();
router.get("/my_cart", checkAuth, CartController.findOne);
export default router;
