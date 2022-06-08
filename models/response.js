const mongoose = require("mongoose");
const responseSchema = new mongoose.Schema({
  question_one: {
    type: String,
    required: true,
    trim: true,
  },
  question_two: {
    type: String,
    required: true,
    trim: true,
  },
  question_three: {
    type: String,
    required: true,
    trim: true,
  },
  question_four: {
    type: String,
    required: true,
    trim: true,
  },
  question_five: {
    type: String,
    required: true,
    trim: true,
  },
});

const ResponseModel = mongoose.model("response", responseSchema);
module.exports = ResponseModel;
