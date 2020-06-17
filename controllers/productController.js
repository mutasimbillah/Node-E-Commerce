const path = require("path");
const Product = require("../models/product");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
// @desc      Get All Products
// @route     GET /api/v1/products
// @access    Public
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

  query = Product.find(queryString);
  const data = await query;
  res.status(200).json({ success: true, Data: data });
});
// @desc      Get single products
// @route     GET /api/v1/products/:id
// @access    Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  //console.log(product);
  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: product });
});
exports.createProduct = asyncHandler(async (req, res, next) => {
  //console.log(req.body);
  const data = await Product.create(req.body);
  res.status(201).json({ success: true, msg: "Product Created", data: data });
});
// @desc      Delete product
// @route     DELETE /api/v1/product/:id
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  product.remove();

  res.status(200).json({ success: true, data: {} });
});
// @desc      Update product
// @route     PUT /api/v1/product/:id
// @access    Private
// Make sure user is Product owner
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  product = await Product.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: product });
});
// @desc      Upload photo for Product
// @route     PUT /api/v1/product/:id/photo
// @access    Private
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${product._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Product.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
