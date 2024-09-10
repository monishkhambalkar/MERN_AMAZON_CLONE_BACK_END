const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // Define product schema fields
});

module.exports = mongoose.model("Product", productSchema);
