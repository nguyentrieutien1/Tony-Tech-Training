"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const index_route_1 = __importDefault(require("./routes/index.route"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT) || 3000;
// CONNECT DB
db_1.ConnectDatabase.connect();
// MIDDLEWARES
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// RUN APP ROUTES
app.use("/api", index_route_1.default);
// HANDLE APP ERRORS  
app.use(error_middleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
