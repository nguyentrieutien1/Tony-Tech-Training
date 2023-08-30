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
exports.CartProductsService = void 0;
const error_response_1 = require("../../core/error.response");
const base_service_type_1 = require("../../types/base-service.type");
class CartProductsService extends base_service_type_1.BaseService {
    constructor() {
        super(...arguments);
        this.addToCart = ({ product, quantity, cart }) => __awaiter(this, void 0, void 0, function* () {
            if (!product || !quantity) {
                throw new error_response_1.BadRequestError("Dont't have payload");
            }
            const cartProduct = yield this.create({
                cart,
                product,
                quantity,
            });
            return cartProduct;
        });
        this.updateCartProduct = (_id, quantity) => __awaiter(this, void 0, void 0, function* () {
            const product = yield this.findByIdAndUpdate(_id, quantity);
            return product;
        });
        this.deleteCartProduct = (cartItemId) => __awaiter(this, void 0, void 0, function* () {
            yield this.findOneAndDelete(cartItemId);
        });
        this.findOneCart = (query) => __awaiter(this, void 0, void 0, function* () {
            return yield this.find(query, "product");
        });
    }
}
exports.CartProductsService = CartProductsService;
