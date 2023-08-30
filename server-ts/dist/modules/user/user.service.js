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
exports.UserService = void 0;
const error_response_1 = require("../../core/error.response");
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const base_service_type_1 = require("../../types/base-service.type");
class UserService extends base_service_type_1.BaseService {
}
exports.UserService = UserService;
_a = UserService;
UserService.create = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password)
        throw new error_response_1.BadRequestError("Missing data to signup !", {
            email,
            password,
        });
    //   CHECK USER
    const checkUser = yield user_model_1.User.findOne({ email });
    if (checkUser) {
        throw new error_response_1.Conflict("User already exists !", { email });
    }
    // HASH PASSWORD
    password = yield bcrypt_1.default.hash(password, 10);
    //   CREATE USER
    const user = yield user_model_1.User.create({ email, password });
    return user;
});
UserService.signIn = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new error_response_1.NotFound("email or password is incorrect !", { email });
    }
    const checkPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!checkPassword)
        throw new error_response_1.BadRequestError("email or password is incorrect !");
    const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.PRIVATE_KEY);
    return { accessToken };
});
UserService.getById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(_id);
    if (!user)
        throw new error_response_1.NotFound();
    return user;
});
