const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  productPhotoUpload,
} = require("../controllers/productController");
const router = express.Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);
router.route("/:id/photo").put(productPhotoUpload);

module.exports = router;
