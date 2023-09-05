import express, { Router } from "express";
import { UserController } from "../modules/user/user.controller";
import { checkAuth } from "../middlewares/auth.middleware";
const router: Router = express.Router();
router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
router.post("/profile", checkAuth, UserController.getById);
export default router;
