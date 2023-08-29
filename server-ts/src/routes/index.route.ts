import productRouter from "./products.route";
import { Router } from "express";
const router = Router();
router.use("/products", productRouter);
export default router;
