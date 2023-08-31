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
exports.ProductController = void 0;
const success_response_1 = require("../../core/success.response");
const products_service_1 = require("./products.service");
const helpError_helper_1 = require("../../helpers/helpError.helper");
class ProductController {
}
exports.ProductController = ProductController;
_a = ProductController;
ProductController.find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_service_1.ProductService.find();
        return new success_response_1.Ok({
            data: products,
            message: "Get all product successful !",
        }).send(res);
    }
    catch (error) {
        (0, helpError_helper_1.HelpError)(error, res);
    }
});
