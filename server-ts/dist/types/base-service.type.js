"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    create(item) {
        return Promise.resolve(item);
    }
    findOne(_id) {
        return Promise.resolve([]);
    }
    findAll() {
        return Promise.resolve([]);
    }
    findByIdAndUpdate(_id, data) {
        return Promise.resolve(data);
    }
    findOneAndDelete(_id) {
        return Promise.resolve();
    }
}
exports.BaseService = BaseService;
