import { config } from "dotenv";
config();
import express, { Application } from "express";
import cors from "cors";
import { ConnectDatabase } from "./config/db";
import appRouters from "./routes/index.route";
import { errorHandler } from "./middlewares/error.middleware";
const app: Application = express();

const PORT: number = parseInt(process.env.PORT!) || 3000;

// CONNECT DB
ConnectDatabase.connect();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// RUN APP ROUTES
app.use("/api", appRouters);

// HANDLE ERROR APP 
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
