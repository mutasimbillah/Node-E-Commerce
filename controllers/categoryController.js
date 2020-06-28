const path = require("path");
const Category = require("../models/category");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
// @desc      Create Category
// @route     Post /api/v1/Store
// @access    Private
exports.CreateCategory = asyncHandler(async (req, res, next) => {
  //console.log(req.body);
  const data = await Category.create(req.body);
  res.status(201).json({ success: true, msg: "Store Created", data: data });
});
// @desc      Get All Category
// @route     GET /api/v1/Store
// @access    Public
exports.ALLCategories = asyncHandler(async (req, res, next) => {
  const data = await Category.find();
  res.status(200).json({ success: true, Data: data });
});
