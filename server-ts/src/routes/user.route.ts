import express, { Router } from "express";
import { UserController } from "../modules/user/user.controller";
const router: Router = express.Router();
router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
export default router;
