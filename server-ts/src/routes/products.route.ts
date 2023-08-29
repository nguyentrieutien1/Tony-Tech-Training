import express, { Router } from "express";
const router: Router = express.Router();
import { ProductController } from "../modules/products/products.controller";
router.get("/", ProductController.findAll);
export default router;
