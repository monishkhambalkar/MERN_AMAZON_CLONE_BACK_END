const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Define user schema fields
});

module.exports = mongoose.model("User", userSchema);
