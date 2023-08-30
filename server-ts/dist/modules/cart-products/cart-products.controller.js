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
exports.CartProductsController = void 0;
const cart_products_service_1 = require("./cart-products.service");
const success_response_1 = require("../../core/success.response");
const mongoose_1 = require("mongoose");
const helpError_helper_1 = require("../../helpers/helpError.helper");
const cart_products_model_1 = require("./cart-products.model");
const cartProductsService = new cart_products_service_1.CartProductsService(cart_products_model_1.CartProducts);
class CartProductsController {
}
exports.CartProductsController = CartProductsController;
_a = CartProductsController;
CartProductsController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity } = req.body;
        const cartId = req.cartId;
        const cartItem = yield cartProductsService.addToCart({
            product: productId,
            quantity,
            cart: cartId,
        });
        return new success_response_1.Success({
            message: "Cart item has been created !",
            data: cartItem,
        }).send(res);
    }
    catch (error) {
        (0, helpError_helper_1.HelpError)(error, res);
    }
});
CartProductsController.findByIdAndUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const product = yield cartProductsService.updateCartProduct(new mongoose_1.Types.ObjectId(id), {
            quantity,
        });
        return new success_response_1.Ok({ data: product }).send(res);
    }
    catch (error) {
        (0, helpError_helper_1.HelpError)(error, res);
    }
});
CartProductsController.findByIdAndDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield cartProductsService.deleteCartProduct(new mongoose_1.Types.ObjectId(id));
        return new success_response_1.Ok({ data: null }).send(res);
    }
    catch (error) {
        (0, helpError_helper_1.HelpError)(error, res);
    }
});
