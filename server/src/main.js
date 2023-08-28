const express = require("express");
const { errorHandler } = require("./middlewares/error.middleware");
const app = express();
const { checkDbFile } = require("./middlewares/checkDbExits.middleware");
const appRouters = require("./routes/index.route");
const cors = require("cors");
const { logger } = require("./configs/logger");
const { ConnectDatabase } = require("./configs/db");
require("dotenv").config();
const PORT = process.env.PORT || 9000;

// CONNECT DB
ConnectDatabase.connect();

// MIDDLEWARES
app.use(checkDbFile);
app.use(express.json({}));
app.use(cors());

// RUN APP ROUTERS
app.use("/api", appRouters);
// CATCH APP ERROR
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`App is running on link http://localhost:${PORT}`);
  console.log(`App is running on link http://localhost:${PORT}`);
});