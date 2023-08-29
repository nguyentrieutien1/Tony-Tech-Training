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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class ConnectDatabase {
}
exports.ConnectDatabase = ConnectDatabase;
_a = ConnectDatabase;
ConnectDatabase.connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_CONNECT_STRING_LOCAL);
        console.log("Connect successful to mongodb");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("error connect:", error.message);
        }
        else {
            console.error("Unknown error:", error);
        }
    }
});
