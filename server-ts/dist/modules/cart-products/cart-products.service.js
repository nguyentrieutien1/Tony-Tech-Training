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
exports.CartProductsService = void 0;
const error_response_1 = require("../../core/error.response");
const cart_products_model_1 = require("./cart-products.model");
const base_service_type_1 = require("../../types/base-service.type");
class CartProductsService extends base_service_type_1.BaseService {
}
exports.CartProductsService = CartProductsService;
_a = CartProductsService;
CartProductsService.create = ({ product, quantity, cart }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!product || !quantity) {
        throw new error_response_1.BadRequestError("Dont't have payload");
    }
    const cartProduct = yield cart_products_model_1.CartProducts.create({
        cart,
        product,
        quantity,
    });
    return cartProduct;
});
CartProductsService.findByIdAndUpdate = (_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield cart_products_model_1.CartProducts.findById(_id);
    if (product) {
        product.quantity = data;
        return yield product.save();
    }
    return product;
});
CartProductsService.findOneAndDelete = (cartItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield cart_products_model_1.CartProducts.findByIdAndDelete(cartItemId);
    if (!product)
        throw new error_response_1.NotFound("Cart item not found in your cart !");
    return product;
});
