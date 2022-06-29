const mongoose = require("mongoose");
const prescriptionSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
  },
  patient_age: {
    type: String,
    required: true,
  },
  patient_name: {
    type: String,
    required: true,
  },
  token_no: {
    type: String,
  },
  temperature: {
    type: String,
  },
  pulse_rate: {
    type: String,
  },
  doctor_name: {
    type: String,
  },
  final_diagnosis: {
    type: String,
  },
  drug_name: {
    type: String,
  },
  frequency: {
    type: String,
  },
  duration: {
    type: String,
  },
  time: {
    type: String,
  },
  remarks: {
    type: String,
    default: "No remarks",
  },
  status: {
    type: Boolean,
    default: false,
  },
  medicines: [
    {
      slno: {
        type: String,
      },
      drug_name: {
        type: String,
      },
      frequency: {
        type: String,
      },
      duration: {
        type: String,
      },
      time: {
        type: String,
      },
      remarks: {
        type: String,
        default: "No remarks",
      },
    },
  ],
});

const PrescriptionModel = mongoose.model("prescription", prescriptionSchema);
module.exports = PrescriptionModel;
