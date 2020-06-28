const express = require("express");
const { GetStores, CreateStore } = require("../controllers/storeController");
const router = express.Router();

router.route("/").get(GetStores).post(CreateStore);
module.exports = router;
