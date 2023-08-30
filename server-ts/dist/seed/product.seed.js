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
const products_model_1 = require("../modules/products/products.model");
const products_json_1 = require("./../database/products.json");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.ConnectDatabase.connect();
        const getAllProduct = yield products_model_1.Product.find();
        if (getAllProduct.length === 0) {
            yield products_model_1.Product.insertMany(products_json_1.products);
        }
        console.log("Write the data to product collection successfull !");
        process.exit(0);
    }
    catch (error) {
        process.exit(1);
    }
}))();
