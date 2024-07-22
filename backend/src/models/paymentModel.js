const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    method: { type: String, required: true }, // e.g., "credit card", "paypal", etc.
    message: { type: String },
    anonymous: {
      type: Boolean,
      default: false
    },
  }, {timestamps: true, });

module.exports = mongoose.model("Payment", paymentSchema);
