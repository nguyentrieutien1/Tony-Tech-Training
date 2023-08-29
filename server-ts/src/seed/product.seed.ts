import { config } from "dotenv";
config();
import { ConnectDatabase } from "../config/db";
import { HelpError } from "../helpers/helpError.helper";
import { Product } from "../modules/products/products.model";
import { products } from "./../database/products.json";

(async () => {
  try {
    await ConnectDatabase.connect();
    const getAllProduct = await Product.find();
    if (getAllProduct.length === 0) {
      for (let i = 0; i < products.length; i++) {
        await Product.create(products[i]);
      }
    }
    console.log("Write the data to product collection successfull !");
    process.exit(0);
  } catch (error) {
    HelpError(error);
    process.exit(1);
  }
})();
