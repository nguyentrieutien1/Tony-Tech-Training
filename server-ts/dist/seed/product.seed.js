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
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db_1 = require("../config/db");
const helpError_helper_1 = require("../helpers/helpError.helper");
const products_model_1 = require("../modules/products/products.model");
const products_json_1 = require("./../database/products.json");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.ConnectDatabase.connect();
        const getAllProduct = yield products_model_1.Product.find();
        if (getAllProduct.length === 0) {
            for (let i = 0; i < products_json_1.products.length; i++) {
                yield products_model_1.Product.create(products_json_1.products[i]);
            }
        }
        console.log("Write the data to product collection successfull !");
        process.exit(0);
    }
    catch (error) {
        (0, helpError_helper_1.HelpError)(error);
        process.exit(1);
    }
}))();
