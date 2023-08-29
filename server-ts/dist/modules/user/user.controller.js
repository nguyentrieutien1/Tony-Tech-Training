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
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userInfo = yield user_service_1.UserService.signUp({ email, password });
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
        const accessToken = yield user_service_1.UserService.signIn({
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
