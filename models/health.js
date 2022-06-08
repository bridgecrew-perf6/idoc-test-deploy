const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema(
  {
    temperature: { type: Number, required: true, trim: true },
    pulse: { type: Number, required: true, trim: true },
    oxygen: { type: Number, required: true, trim: true },
    weight: { type: Number, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("healthDetails", healthSchema);
