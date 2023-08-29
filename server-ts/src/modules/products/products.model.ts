import mongoose from "mongoose";
import { ProductDTO } from "../../types/products.type";
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  image: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_title: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
});
//Export the model
const Product = mongoose.model<ProductDTO>("Product", productSchema);
export { Product };
