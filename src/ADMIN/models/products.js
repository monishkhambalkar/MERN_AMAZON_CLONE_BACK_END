const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_name: { type: String, required: true },
  category_id: { type: String, required: true },
  sub_category_id: { type: String, required: true },
  original_price: { type: Number, required: true },
  selling_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  label_tags: { type: String, required: false },
  product_content: { type: String, required: false },
  product_specification: { type: String, required: false },
  brand: { type: String, required: false },
  colors: { type: String, required: false },
  images: { type: [String], required: false },
  user_id: { type: String, required: false },
  createdAt: { type: Date, required: false },
  updatedAt: { type: Date, required: false },
  status: { type: Number, required: true },
});

const productModel = mongoose.model("admin_products", productSchema);
module.exports = productModel;
