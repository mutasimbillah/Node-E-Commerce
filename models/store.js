const mongoose = require("mongoose");
const StoreSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  storeCountryCode: {
    type: String,
    uppercase: true,
    required: true,
    maxlength: 2,
  },
  storeCurrencyName: {
    type: String,
    required: true,
  },
  storeCurrencySymble: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Store", StoreSchema);
