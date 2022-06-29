const User = require("../models/user");
const Stock = require("../models/stocks");
const Patient = require("../models/patient");
const fs = require("fs");
const { token } = require("morgan");
const Prescription = require("../models/prescription");

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

exports.showStockName = async (req, res) => {
  const stock = [];
  var i = 0;
  try {
    const stocksName = await Stock.find({}).select("stock_name");
    for (i = 0; i < stocksName.length; i++) {
      stock.push(stocksName[i].stock_name);
    }
    res.status(200).json(stock);
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
      active_token: false,
      patient_address: req.body.patient_address,
      // patient_health: req.body.patient_health,
    });
    const user = await newPatient.save();
    res.status(200).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ sucess: false, error });
  }
};
exports.getPatient = async (req, res) => {
  try {
    const patientDetails = await Patient.find({ active_token: true });
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
        active: true,
      };

      console.log(sampleObj);
      const result = await Patient.update(
        { patient_finger: finger_id },
        {
          // $push: { patient_health: sampleObj },
          // patient_health: sampleObj,
          token_no: globalToken,
          temperature: req.body.temperature,
          pulse_rate: req.body.pulse_rate,
          oxygen_rate: req.body.oxygen_rate,
          active: true,
          active_token: true,
        }
      );
    }

    res.status(200).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ sucess: false, error });
  }
};

exports.editTokenStatus = async (req, res) => {
  try {
    var objId = req.body._id;
    const result = await Patient.updateOne(
      { _id: objId },
      {
        active_token: false,
      }
    );
    res.status(200).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ sucess: false, error });
  }
};

exports.editPriscribStatus = async (req, res) => {
  try {
    var objId = req.body._id;
    const result = await Prescription.updateOne(
      { _id: objId },
      {
        status: false,
      }
    );
    res.status(200).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ sucess: false, error });
  }
};

exports.addPrescription = async (req, res) => {
  try {
    let medicines = {
      slno: req.body.slno,
    };
    console.log(medicines);
    const newPrescrip = new Prescription({
      patient_id: req.body.patient_id,
      patient_age: req.body.patient_age,
      patient_name: req.body.patient_name,
      token_no: req.body.token_no,
      temperature: req.body.temperature,
      pulse_rate: req.body.pulse_rate,
      doctor_name: req.body.doctor_name,
      final_diagnosis: req.body.final_diagnosis,
      drug_name: req.body.drug_name,
      frequency: req.body.frequency,
      duration: req.body.duration,
      time: req.body.time,
      remarks: req.body.remarks,
      // medicines: [
      //   {
      //     slno: req.body.slno,
      //     drug_name: req.body.drug_name,
      //     frequency: req.body.frequency,
      //     duration: req.body.duration,
      //     time: req.body.time,
      //     remarks: req.body.remarks,
      //   },
      // ],
      medicines: req.body.medicines,
      status: true,
    });
    const prescription = await newPrescrip.save();
    res.status(200).json({ sucess: true });
  } catch (error) {
    res.status(500).json({ sucess: false, error });
  }
};

exports.getPrescription = async (req, res) => {
  try {
    const prescripDetails = await Prescription.find({ status: true });
    res.status(200).json({ sucess: true, prescripDetails });
  } catch (error) {
    res.status(500).json({ sucess: false, error });
  }
};

exports.loginUser = async (req, res) => {};
