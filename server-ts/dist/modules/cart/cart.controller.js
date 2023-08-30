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
exports.CartController = void 0;
const success_response_1 = require("../../core/success.response");
const cart_service_1 = require("./cart.service");
const helpError_helper_1 = require("../../helpers/helpError.helper");
const cart_model_1 = require("./cart.model");
const cartService = new cart_service_1.CartService(cart_model_1.Cart);
class CartController {
}
exports.CartController = CartController;
_a = CartController;
CartController.findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const _id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const product = yield cartService.findOneCart({
            userId: _id,
        });
        return new success_response_1.Ok({
            data: product,
            message: "Get product successful !",
        }).send(res);
    }
    catch (error) {
        (0, helpError_helper_1.HelpError)(error, res);
    }
});
