import { config } from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
config();
const app: Application = express();

const PORT = process.env.PORT || 3000;
// MIDDLEWARES
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
