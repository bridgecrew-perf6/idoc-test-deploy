const express = require("express");
const { addResponse } = require("../Controller/response");
const router = express.Router();

router.route("/add").post(addResponse);
module.exports = router;
