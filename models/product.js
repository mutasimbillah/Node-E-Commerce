const mongoose = require("mongoose");
const slugify = require("slugify");
const discount = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
  },
  condition_amount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});
const categories = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
});
const features = new mongoose.Schema({
  feature_name: {
    type: String,
    required: true,
  },
  feature: {
    type: String,
    required: true,
  },
});
const prices = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const stocks = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
  },
  stock_amount: {
    type: Number,
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
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
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
  categories: [categories],
  features: [features],
  stocks: [stocks],
  prices: [prices],
  discounts: [discount],
});
productSchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
  next();
});
module.exports = mongoose.model("product", productSchema);
