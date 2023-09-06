import { config } from "dotenv";
config();
import express, { Application } from "express";
import cors from "cors";
import { ConnectDatabase } from "./config/db";
import appRouters from "./routes/index.route";
import { errorHandler } from "./middlewares/error.middleware";
const app: Application = express();

const PORT: number = 5000;
// CONNECT DB
ConnectDatabase.connect();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// RUN APP ROUTES
app.use("/api", appRouters);

// HANDLE APP ERRORS  
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
