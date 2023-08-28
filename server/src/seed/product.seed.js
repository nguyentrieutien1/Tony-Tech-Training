const { mongoDbInstance } = require("../configs/db");
const { products } = require("../database/products.json");
const { Product } = require("../modules/product/product.model");
require("dotenv").config();
(async () => {
  await mongoDbInstance.connect();
  const getAllProduct = await Product.find();
  if (getAllProduct.length === 0) {
    for (let i = 0; i < products.length; i++) {
      await Product.create(products[i]);
    }
  }
  console.log("Write the data to product collection successfull !");
  process.exit(0);
})();
