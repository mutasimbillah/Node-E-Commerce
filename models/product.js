const mongoose = require("mongoose");
const slugify = require("slugify");
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
  slug: String,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  description: {
    type: String,
    maxlength: [300, "Description Can not be more than 300 char"],
  },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please add a product Category"],
  },
  stock: [
    {
      store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: [true, "Please add All Store in the Stock"],
      },
      amount: {
        type: Number,
        require: [true, "Please add Stock Amount"],
      },
    },
  ],
  prices: [
    {
      store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: [true, "Please add All Store in the Stock"],
      },
      price: {
        type: Number,
        require: [true, "Please add Product Price"],
      },
    },
  ],
});
productSchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
  next();
});
module.exports = mongoose.model("product", productSchema);
