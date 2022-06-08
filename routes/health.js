const express = require("express");
const router = express.Router();
const { addHealth, displayHealth } = require("../Controller/health");

router.route("/add").post(addHealth);
router.route("/showHealth").get(displayHealth);
module.exports = router;
