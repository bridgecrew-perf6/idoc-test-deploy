const express = require("express");
const { addUser, userLogin, testApi } = require("../Controller/user");
const router = express.Router();

router.route("/").get(testApi);
router.route("/signup").post(addUser);
router.route("/signin").get(userLogin);
module.exports = router;
