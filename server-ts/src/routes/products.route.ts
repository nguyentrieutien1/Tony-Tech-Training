import express, { Router } from "express";
const router: Router = express.Router();
import { ProductController } from "../modules/products/products.controller";
import { checkAuth } from "../middlewares/auth.middleware";
router.get("/", checkAuth, ProductController.findAll);
export default router;
