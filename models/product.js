const mongoose = require("mongoose");
const slugify = require("slugify");

const strnumpair = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});
const strstrpair = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  str: {
    type: String,
    required: true,
  },
});
const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    unique: true,
    required: [true, "Please add a product unique SKU"],
    maxlength: [20, "Name Can not be more than 50 char"],
  },
  asin: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Please add a product name"],
    maxlength: [50, "Name Can not be more than 50 char"],
  },
  slug: String,
  shortDescription: {
    type: String,
    maxlength: [100, "shortDescription Can not be more than 50 char"],
  },
  longDescription: {
    type: String,
    maxlength: [100, "shortDescription Can not be more than 50 char"],
  },
  brand: {
    type: String,
  },
  vendor: {
    type: String,
  },
  categories: [strstrpair],
  features: [strstrpair],
  stock: [strnumpair],
  price: [strnumpair],
  variations: [strnumpair],
});
productSchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
  next();
});
module.exports = mongoose.model("product", productSchema);
