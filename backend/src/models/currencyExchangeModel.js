const mongoose = require("mongoose");

const currencyExchangeSchema = new mongoose.Schema({
  success: {
    type: Boolean,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  base: {
    type: String,
    required: true,
    default: "EUR",
  },
  date: {
    type: String,
    required: true,
  },
  rates: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("CurrencyExchange", currencyExchangeSchema);
