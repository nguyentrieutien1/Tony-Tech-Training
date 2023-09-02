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
const base_service_repository_1 = require("../../core/base-service.repository");
const cart_products_model_1 = require("./cart-products.model");
class CartProductsService extends base_service_repository_1.BaseService {
}
exports.CartProductsService = CartProductsService;
_a = CartProductsService;
CartProductsService._instance = new base_service_repository_1.BaseService(cart_products_model_1.CartProducts);
CartProductsService.create = ({ product, quantity, cart }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!product || !quantity) {
        throw new error_response_1.BadRequestError("Dont't have payload");
    }
    const cartProduct = yield _a._instance.create({
        cart,
        product,
        quantity,
    });
    const findCartItem = yield _a._instance.findOne(cartProduct._id, "product");
    return findCartItem;
});
CartProductsService.findByIdAndUpdate = (_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield _a._instance.findByIdAndUpdate(_id, quantity);
    return product;
});
CartProductsService.findByIdAndDelete = (cartItemId) => __awaiter(void 0, void 0, void 0, function* () {
    yield _a._instance.findByIdAndDelete(cartItemId);
});
CartProductsService.findOneCart = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield _a._instance.find(query, "product");
});
