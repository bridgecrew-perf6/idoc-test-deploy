const express = require("express");
const { addUser, userLogin, testApi } = require("../Controller/user");
const router = express.Router();

router.route("/").get(testApi);
router.route("/signup").post(addUser);
router.route("/signin").post(userLogin);
module.exports = router;
