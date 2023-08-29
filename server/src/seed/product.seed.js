require("dotenv").config();
const { ConnectDatabase } = require("../configs/db");
const { products } = require("../database/products.json");
const { errorHandler } = require("../middlewares/error.middleware");
const { Product } = require("../modules/product/product.model");
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
    errorHandler(error);
    process.exit(1);
  }
})();
