const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // Define order schema fields
});

module.exports = mongoose.model("Order", orderSchema);
