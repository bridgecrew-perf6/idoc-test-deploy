const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    trim: true,
  },
  user_name: {
    type: String,
    required: true,
    trim: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_number: {
    type: Number,
    required: true,
    trim: true,
  },
  user_mail: {
    type: String,
    required: true,
    trim: true,
  },
  user_address: {
    type: String,
    required: true,
    trim: true,
  },
  user_role: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
