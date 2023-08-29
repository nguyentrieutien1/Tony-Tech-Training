"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartProducts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartProductSchema = new mongoose_1.default.Schema({
    cart: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Cart",
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: Number,
});
const CartProducts = mongoose_1.default.model("CartProduct", cartProductSchema);
exports.CartProducts = CartProducts;
