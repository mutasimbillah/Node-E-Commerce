const mongoose = require("mongoose");
const Vendor = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
  },
  vendorDetails: {
    type: String,
    required: true,
  },
});
