const mongoose = require("mongoose");

const paymentSchema = require("./paymentModel");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already registered"],
      index: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    totalPaid: {
      type: Number,
      default: 0,
    },
    paymentIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: [] },
    ],
  },
  {timestamps: true, }
);

module.exports = mongoose.model("User", userSchema);
