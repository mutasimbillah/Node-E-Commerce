const product = require("../models/product");
const asyncHandler = require("../middleware/async");

exports.getProducts = asyncHandler(async (req, res, next) => {
  //console.log(req.query);
  let query;
  let queryString = JSON.stringify(req.query);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  queryString = JSON.parse(queryString);
  console.log(queryString);

  query = product.find(queryString);
  const data = await query;
  res.status(200).json({ success: true, Data: data });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  //console.log(req.body);
  const data = await product.create(req.body);
  res.status(201).json({ success: true, msg: "Product Created", data: data });
});
