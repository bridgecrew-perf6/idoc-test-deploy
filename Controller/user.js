const User = require("../models/user");
const Stock = require("../models/stocks");
const Patient = require("../models/patient");
const fs = require("fs");
const { token } = require("morgan");

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

exports.listUser = async (req, res) => {
  try {
    const userListFromDB = await User.find();
    res.status(200).json({ sucess: true, users: userListFromDB });
  } catch (error) {
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

exports.searchStock = async (req, res) => {
  console.log(req.params.key);
  let data = await Stock.find({
    $or: [
      { stock_name: { $regex: req.params.key } },
      { stock_category: { $regex: req.params.key } },
      { company_name: { $regex: req.params.key } },
      { effect: { $regex: req.params.key } },
    ],
  });
  res.send(data);
};

exports.addPatient = async (req, res) => {
  try {
    const newPatient = new Patient({
      patient_id: req.body.patient_id,
      patient_name: req.body.patient_name,
      patient_finger: req.body.patient_finger,
      patient_number: req.body.patient_number,
      patient_mail: req.body.patient_mail,
      patient_age: req.body.patient_age,
      patient_address: req.body.patient_address,
      patient_health: req.body.patient_health,
    });
    const user = await newPatient.save();
    res.status(200).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ sucess: false, error });
  }
};
exports.getPatient = async (req, res) => {
  try {
    const patientDetails = await Patient.find();
    res.status(200).json({ sucess: true, Patient: patientDetails });
  } catch (error) {
    res.status(500).json({ sucess: false, error });
  }
};
exports.newToken = async (req, res) => {
  try {
    let globalToken;
    fs.readFile("token.txt", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      let token = data;
      token++;
      console.log(token);
      addNewToken(token.toString());
    });
    async function addNewToken(token) {
      globalToken = await token.toString();
      console.log(globalToken);
      fs.writeFile("token.txt", token, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });

      const update = req.body;
      const finger_id = req.body.patient_finger;
      const sampleObj = {
        token_no: globalToken,
        temperature: req.body.temperature,
        pulse_rate: req.body.pulse_rate,
        oxygen_rate: req.body.oxygen_rate,
      };

      console.log(sampleObj);
      const result = await Patient.update(
        { patient_finger: finger_id },
        {
          $push: { patient_health: sampleObj },
        }
      );
    }

    res.status(200).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ sucess: false, error });
  }
};

exports.loginUser = async (req, res) => {};
