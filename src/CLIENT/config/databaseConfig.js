const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost/amazon-clone", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.error("Database connection error", err);
    });
};
