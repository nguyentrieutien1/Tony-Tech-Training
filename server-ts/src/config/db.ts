import mongoose from "mongoose";
class ConnectDatabase {
  static connect = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_CONNECT_STRING_LOCAL!);
      console.log("Connect successful to mongodb");
    } catch (error) {
      if (error instanceof Error) {
        console.error("error connect:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };
}
export { ConnectDatabase };
