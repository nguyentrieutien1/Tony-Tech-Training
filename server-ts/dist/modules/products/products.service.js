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
exports.ProductService = void 0;
const base_service_repository_1 = require("../../core/base-service.repository");
const products_model_1 = require("./products.model");
class ProductService extends base_service_repository_1.BaseService {
}
exports.ProductService = ProductService;
_a = ProductService;
ProductService._instance = new base_service_repository_1.BaseService(products_model_1.Product);
ProductService.find = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield _a._instance.find({});
    return products;
});
