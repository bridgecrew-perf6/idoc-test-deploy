const mongoose = require("mongoose");
const stockSchema = new mongoose.Schema({
  stock_name: {
    type: String,
    required: true,
  },
  stock_category: {
    type: String,
    required: true,
  },
  stock_unit: {
    type: String,
    required: true,
  },
  stock_type: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  effect: {
    type: String,
    required: true,
  },
  expiry_date: {
    type: String,
    required: true,
  },
});

const StockModel = mongoose.model("stocks", stockSchema);
module.exports = StockModel;
