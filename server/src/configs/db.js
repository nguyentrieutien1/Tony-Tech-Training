const mongoose = require("mongoose");
class ConnectDatabase {
  connect = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_CONNECT_STRING_LOCAL);
      console.log("Connect successful to mongodb");
    } catch (error) {
      console.error("error connect:", error.message);
      process.exit(1);
    }
  };
}
const mongoDbInstance = new ConnectDatabase();
module.exports = { mongoDbInstance };
