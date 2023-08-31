"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const products_controller_1 = require("../modules/products/products.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
router.get("/", auth_middleware_1.checkAuth, products_controller_1.ProductController.find);
exports.default = router;
