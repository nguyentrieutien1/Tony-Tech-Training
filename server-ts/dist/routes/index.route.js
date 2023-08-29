"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_route_1 = __importDefault(require("./products.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const cart_products_route_1 = __importDefault(require("./cart-products.route"));
const user_route_1 = __importDefault(require("./user.route"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use("/products", products_route_1.default);
router.use("/cart", cart_route_1.default);
router.use("/cart-products", cart_products_route_1.default);
router.use("/user", user_route_1.default);
exports.default = router;
