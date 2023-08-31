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
exports.BaseService = void 0;
const error_response_1 = require("./error.response");
class BaseService {
    constructor(model) {
        this.model = model;
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(item);
        });
    }
    find(query, populateOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (populateOptions) {
                return yield this.model.find(query).populate(populateOptions);
            }
            return yield this.model.find(query).exec();
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne(query).exec();
        });
    }
    findById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findById(_id).exec();
        });
    }
    findByIdAndUpdate(_id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.model
                .findByIdAndUpdate(_id, item, { new: true })
                .exec());
        });
    }
    findByIdAndDelete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findByIdAndDelete(_id).exec();
            if (!result)
                throw new error_response_1.NotFound();
        });
    }
}
exports.BaseService = BaseService;
