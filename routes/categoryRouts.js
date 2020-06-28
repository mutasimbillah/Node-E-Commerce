const express = require("express");
const {
  CreateCategory,
  ALLCategories,
} = require("../controllers/categoryController");
const router = express.Router();

router.route("/").get(ALLCategories).post(CreateCategory);
module.exports = router;
