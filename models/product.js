const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    unique: true,
    required: [true, "Please add a product unique SKU"],
    maxlength: [20, "Name Can not be more than 50 char"],
  },
  name: {
    type: String,
    required: [true, "Please add a product name"],
    maxlength: [50, "Name Can not be more than 50 char"],
  },
  price: Number,
});
module.exports = mongoose.model("product", productSchema);
