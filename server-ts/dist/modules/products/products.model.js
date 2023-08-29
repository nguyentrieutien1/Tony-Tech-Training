"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
    },
    image: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    product_title: {
        type: String,
        required: true,
    },
    product_price: {
        type: String,
        required: true,
    },
});
//Export the model
const Product = mongoose_1.default.model("Product", productSchema);
exports.Product = Product;
