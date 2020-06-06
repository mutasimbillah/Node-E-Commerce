const product = require("../models/product");

exports.getProducts = async (req, res, next) => {
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
};
exports.createProduct = async (req, res, next) => {
  //console.log(req.body);
  try {
    const data = await product.create(req.body);
    res.status(201).json({ success: true, msg: "Product Created", data: data });
  } catch (err) {
    console.log(err);
  }
};
