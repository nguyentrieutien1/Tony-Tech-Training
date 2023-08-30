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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const error_response_1 = require("../../core/error.response");
const cart_products_model_1 = require("./../cart-products/cart-products.model");
const base_service_type_1 = require("../../types/base-service.type");
const cart_products_service_1 = require("../cart-products/cart-products.service");
class CartService extends base_service_type_1.BaseService {
    constructor() {
        super(...arguments);
        this.findOneCart = ({ userId, }) => __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                throw new error_response_1.BadRequestError("Missing user id");
            const cartUser = yield this.findOne({ user: userId });
            if (!cartUser)
                throw new error_response_1.NotFound();
            const cartProductsService = new cart_products_service_1.CartProductsService(cart_products_model_1.CartProducts);
            const order = yield cartProductsService.findOneCart({
                cart: cartUser._id,
            });
            return order;
        });
    }
}
exports.CartService = CartService;
