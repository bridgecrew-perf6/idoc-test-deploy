const express = require("express");
const {
  addUser,
  userLogin,
  testApi,
  addStocks,
} = require("../Controller/user");
const router = express.Router();

router.route("/").get(testApi);
router.route("/signup").post(addUser);
router.route("/signin").post(userLogin);
router.route("/stocks/add").post(addStocks);
module.exports = router;
