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
const base_service_repository_1 = require("../../core/base-service.repository");
const cart_products_service_1 = require("../cart-products/cart-products.service");
const cart_model_1 = require("./cart.model");
class CartService extends base_service_repository_1.BaseService {
}
exports.CartService = CartService;
_a = CartService;
CartService._instance = new base_service_repository_1.BaseService(cart_model_1.Cart);
CartService.findOne = ({ userId, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        throw new error_response_1.BadRequestError("Missing user id");
    const cartUser = yield _a._instance.findOne({
        user: userId,
    });
    if (!cartUser) {
        return [];
    }
    const order = yield cart_products_service_1.CartProductsService.findOneCart({
        cart: cartUser._id,
    });
    return order;
});
