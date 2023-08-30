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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const success_response_1 = require("../../core/success.response");
const helpError_helper_1 = require("../../helpers/helpError.helper");
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const userService = new user_service_1.UserService(user_model_1.User);
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userInfo = yield userService.createUser({
            email,
            password,
        });
        return new success_response_1.Success({
            data: userInfo,
            message: "User has been created !",
        }).send(res);
    }
    catch (error) {
        (0, helpError_helper_1.HelpError)(error, res);
    }
});
UserController.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const accessToken = yield userService.signIn({
            email,
            password,
        });
        return new success_response_1.Success({
            data: accessToken,
            message: "Login successful !",
        }).send(res);
    }
    catch (error) {
        (0, helpError_helper_1.HelpError)(error, res);
    }
});
UserController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const _id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const user = yield user_service_1.UserService.getById(new mongoose_1.Types.ObjectId(_id));
        return new success_response_1.Ok({ data: user });
    }
    catch (error) {
        (0, helpError_helper_1.HelpError)(error, res);
    }
});
