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
exports.checkCartPermission = void 0;
const error_response_1 = require("../core/error.response");
const cart_products_model_1 = require("../modules/cart-products/cart-products.model");
const cart_model_1 = require("../modules/cart/cart.model");
const helpError_helper_1 = require("../helpers/helpError.helper");
const checkCartPermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { id } = req.params;
        const cart = yield cart_model_1.Cart.findOne({ user: _id });
        if (!cart)
            throw new error_response_1.Unauthorized();
        const cartItem = yield cart_products_model_1.CartProducts.findOne({
            _id: id,
            cart: cart._id,
        });
        if (!cartItem)
            throw new error_response_1.Unauthorized();
        return next();
    }
    catch (error) {
        (0, helpError_helper_1.HelpError)(error, res);
    }
});
exports.checkCartPermission = checkCartPermission;
