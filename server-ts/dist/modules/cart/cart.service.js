"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const error_response_1 = require("../../core/error.response");
const cart_model_1 = require("./cart.model");
const cart_products_model_1 = require("./../cart-products/cart-products.model");
class CartService {
}
exports.CartService = CartService;
_a = CartService;
CartService.findOneByUserId = ({ userId, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        throw new error_response_1.BadRequestError("Missing user id");
    const cartUser = yield cart_model_1.Cart.findOne({ user: userId });
    if (!cartUser) {
        return [];
    }
    const order = yield cart_products_model_1.CartProducts.find({
        cart: cartUser._id,
    }).populate({
        path: "product",
    });
    return order;
});
