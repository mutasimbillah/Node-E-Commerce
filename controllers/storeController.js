const path = require("path");
const Store = require("../models/store");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
// @desc      Create Store
// @route     Post /api/v1/Store
// @access    Private
exports.CreateStore = asyncHandler(async (req, res, next) => {
  //console.log(req.body);
  const data = await Store.create(req.body);
  res.status(201).json({ success: true, msg: "Store Created", data: data });
});
// @desc      Get All Stores
// @route     GET /api/v1/Store
// @access    Public
exports.GetStores = asyncHandler(async (req, res, next) => {
  const data = await Store.find();
  res.status(200).json({ success: true, Data: data });
});
