const express = require("express");
const {
  addUser,
  userLogin,
  testApi,
  addStocks,
  showStocks,
  searchStock,
  listUser,
} = require("../Controller/user");
const router = express.Router();

router.route("/").get(testApi);
router.route("/user").get(listUser);
router.route("/signup").post(addUser);
router.route("/signin").post(userLogin);
router.route("/stocks/add").post(addStocks);
router.route("/stocks").get(showStocks);
router.route("/stocks/search/:key").get(searchStock);

module.exports = router;
