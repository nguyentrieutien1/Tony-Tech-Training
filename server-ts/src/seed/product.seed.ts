import { config } from "dotenv";
config();
import { ConnectDatabase } from "../config/db";
import { Product } from "../modules/products/products.model";
import { products } from "./../database/products.json";

(async () => {
  try {
    await ConnectDatabase.connect();
    const getAllProduct = await Product.find();
    if (getAllProduct.length === 0) {
      await Product.insertMany(products);
    }
    console.log("Write the data to product collection successfull !");
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
})();
