const express = require("express");
const router = express.Router();
const { addHealth } = require("../Controller/health");

router.route("/add").post(addHealth);
module.exports = router;
