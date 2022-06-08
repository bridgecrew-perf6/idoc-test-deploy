const express = require("express");
const { generateToken } = require("../Controller/token");

const router = express.Router();

router.route("/new").get(generateToken);

module.exports = router;
