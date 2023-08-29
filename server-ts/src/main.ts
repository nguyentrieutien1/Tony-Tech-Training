import { config } from "dotenv";
config();
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { ConnectDatabase } from "./config/db";
import appRouters from "./routes/index.route";
const app: Application = express();

const PORT: number = parseInt(process.env.PORT!) || 3000;

// CONNECT DB
ConnectDatabase.connect();
// MIDDLEWARES
app.use(cors());
// RUN APP ROUTES
app.use("/api", appRouters);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
