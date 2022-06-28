const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema({
  patient_finger: {
    type: String,
    required: true,
  },
  token_no: {
    type: Number,
  },
  temperature: {
    type: String,
    required: true,
  },
  pulse_rate: {
    type: String,
    required: true,
  },
  oxygen_rate: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
  },
});

const TokenModel = mongoose.model("token", tokenSchema);
module.exports = TokenModel;
