const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userInfo: {
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
  },
  washerInfo: {
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
  },
  driverInfo: {
    address: {
      type: String,
      required: true,
      unique: false,
    },
    addressPrefs: {
      type: String,
      required: true,
      unique: false,
    },
    pickupDate: {
      type: String,
      required: true,
      unique: false,
    },
    pickupTime: {
      type: String,
      required: true,
      unique: false,
    },
  },
  orderInfo: {
    coupon: {
      type: String,
      required: true,
      unique: false,
    },
    status: {
      type: Number,
      required: true,
      unique: false,
    },
    weight: {
      type: Number,
      required: true,
      unique: false,
    },
    cost: {
      type: Number,
      required: true,
      unique: false,
    },
    created: {
      type: Date,
      required: true,
      unique: false,
    },
    orderID: {
      type: Number,
      required: true,
      unique: false,
    },
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
