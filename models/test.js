const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
});

const TestModel = mongoose.model("testt", testSchema);

module.exports = TestModel;
