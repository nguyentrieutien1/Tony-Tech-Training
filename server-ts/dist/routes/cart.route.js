"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../modules/cart/cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/my_cart", auth_middleware_1.checkAuth, cart_controller_1.CartController.findOneByUserId);
exports.default = router;
