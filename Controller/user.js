const User = require("../models/user");

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
      finger_id: req.body.finger_id,
      user_name: req.body.user_name,
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
    });
    console.log("user from database", userFromDatabase);
    // console.log("*****************************");
    //console.log(user);
    res.status(200).json({
      sucess: true,
      data: {
        user_name: userFromDatabase.user_name,
        user_number: userFromDatabase.user_number,
        user_mail: userFromDatabase.user_mail,
        user_address: userFromDatabase.user_address,
      },
    });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
};
exports.loginUser = async (req, res) => {};
