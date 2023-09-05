import express, { Router } from "express";
const router: Router = express.Router();
import { ProductController } from "../modules/products/products.controller";
import { checkAuth } from "../middlewares/auth.middleware";
router.get("/", ProductController.find);
export default router;
