const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
  },
  patient_name: {
    type: String,
    required: true,
  },
  patient_finger: {
    type: String,
    required: true,
  },
  patient_number: {
    type: String,
    required: true,
  },
  patient_mail: {
    type: String,
    required: true,
  },
  patient_age: {
    type: Number,
    required: true,
  },
  patient_address: {
    type: String,
    required: true,
  },
  patient_health: {
    token_no: {
      type: String,
    },
    token_date: {
      type: Date,
      default: Date.now,
    },
    temperature: {
      type: String,
    },
    pulse_rate: {
      type: String,
    },
    oxygen_rate: {
      type: String,
    },
    active: {
      type: Boolean,
    },
  },
  // {
  //   token_no: String,
  //   token_date: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   temperature: Number,
  //   pulse_rate: Number,
  //   oxygen_rate: Number,
  //   active: Boolean,
  // },
});

const PatientModel = mongoose.model("patient", patientSchema);
module.exports = PatientModel;
