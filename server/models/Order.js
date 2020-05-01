const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: false,
    required: true,
  },
  phone: {
    type: String,
    unique: false,
    required: true,
  },
  coupon: {
    type: String,
    required: true,
    unique: false,
  },
  scented: {
    type: Boolean,
    required: true,
    unique: false,
  },
  delicates: {
    type: Boolean,
    required: true,
    unique: false,
  },
  separate: {
    type: Boolean,
    required: true,
    unique: false,
  },
  towelsSheets: {
    type: Boolean,
    required: true,
    unique: false,
  },
  washerPrefs: {
    type: String,
    required: true,
    unique: false,
  },
  address: {
    type: String,
    required: true,
    unique: false,
  },
  driverPrefs: {
    type: String,
    required: true,
    unique: false,
  },
  date: {
    type: String,
    required: true,
    unique: false,
  },
  time: {
    type: String,
    required: true,
    unique: false,
  },
  status: {
    type: Number,
    required: true,
    unique: false,
  },
});

const User = mongoose.model("Order", OrderSchema);

module.exports = Order;
