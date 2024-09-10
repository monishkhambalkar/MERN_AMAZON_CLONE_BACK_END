const mongoose = require("mongoose");
// mongoose.set("debug", true);
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category_name: { type: String, required: true },
  user_id: { type: String, required: false },
  createdAt: { type: Date, required: false },
  updatedAt: { type: Date, required: false },
  status: { type: Number, required: true },
});

const category = mongoose.model("admin_categories", categorySchema);
module.exports = category;
