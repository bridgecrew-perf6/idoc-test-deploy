const User = require("../models/user");
const Stock = require("../models/stocks");

exports.testApi = async (req, res) => {
  try {
    res.status(200).json({ sucess: true });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
};
exports.addUser = async (req, res) => {
  try {
    const newUser = new User({
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      user_password: req.body.user_password,
      user_number: req.body.user_number,
      user_mail: req.body.user_mail,
      user_address: req.body.user_address,
      user_role: req.body.user_role,
    });
    const user = await newUser.save();
    res.status(200).json({ sucess: true });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
};

// exports.usertest = async (req, res) => {
//   try {
//     const userDetails = await fetch(
//       "https://sreejith97.github.io/sample-api/dataset.json"
//     );
//     let response = await userDetails.json();
//     res.status(200).json({ sucess: true, details: response });
//   } catch (err) {
//     res.status(500).json({ sucess: false, err });
//   }
// };

exports.userLogin = async (req, res) => {
  try {
    const details = req.body;
    //console.log(details,"detailzzz");
    const userFromDatabase = await User.findOne({
      user_mail: details.user_mail,
      user_password: details.user_password,
    });
    console.log("user from database", userFromDatabase);
    // console.log("*****************************");
    //console.log(user);
    res.status(200).json({
      sucess: true,
      data: {
        user_id: userFromDatabase.user_id,
        user_name: userFromDatabase.user_name,
        user_number: userFromDatabase.user_number,
        user_mail: userFromDatabase.user_mail,
        user_address: userFromDatabase.user_address,
        user_role: userFromDatabase.user_role,
      },
    });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
};

exports.addStocks = async (req, res) => {
  try {
    const newStocks = new Stock({
      stock_name: req.body.stock_name,
      stock_category: req.body.stock_category,
      stock_unit: req.body.stock_unit,
      stock_type: req.body.stock_type,
      company_name: req.body.company_name,
      effect: req.body.effect,
      expiry_date: req.body.expiry_date,
    });
    const stocks = await newStocks.save();
    res.status(200).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ sucess: false, error });
  }
};

exports.showStocks = async (req, res) => {
  try {
    const stocksFromDB = await Stock.find();
    res.status(200).json({ sucess: true, stocks: stocksFromDB });
  } catch (error) {
    res.status(500).json({ sucess: false, error });
  }
};

exports.loginUser = async (req, res) => {};
