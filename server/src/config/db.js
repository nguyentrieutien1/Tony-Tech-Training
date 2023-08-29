const mongoose = require("mongoose");
class ConnectDatabase {
  static connect = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_CONNECT_STRING_LOCAL);
      console.log("Connect successful to mongodb");
    } catch (error) {
      console.error("error connect:", error.message);
      process.exit(1);
    }
  };
}
module.exports = { ConnectDatabase };
