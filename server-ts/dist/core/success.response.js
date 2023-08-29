"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Success = exports.Ok = void 0;
const statusCode = {
    OK: 200,
    CREATED: 201,
};
const reasonStatusCode = {
    OK: "OK !",
    CREATED: "Created !",
};
class SuccessResponse {
    constructor({ message = reasonStatusCode.OK, data = [], status = statusCode.OK, }) {
        this.send = (res) => {
            return res.status(this.status).json(this);
        };
        this.data = data;
        this.message = message ? message : "OK";
        this.status = status;
    }
}
class Ok extends SuccessResponse {
    constructor({ data, message }) {
        super({ message, data });
    }
}
exports.Ok = Ok;
class Success extends SuccessResponse {
    constructor({ message = reasonStatusCode.OK, data, status = statusCode.CREATED, }) {
        super({ message, status, data });
    }
}
exports.Success = Success;
