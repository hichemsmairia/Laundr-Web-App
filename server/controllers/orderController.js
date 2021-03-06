const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  let orderCount;

  let activeOrder = false;

  await Order.findOne({
    "userInfo.email": req.body.email,
    "orderInfo.status": { $nin: [7, 8] },
  })
    .then((order) => {
      if (order) {
        activeOrder = true;
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });

  if (activeOrder) {
    return res.json({
      success: false,
      message: "User already has an active order",
    });
  }

  await Order.countDocuments({})
    .then((count) => {
      if (count) {
        console.log("1");
        orderCount = count;
      } else {
        return res.json({
          success: false,
          message: "Error with getting number of total orders",
        });
      }
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: error,
      });
    });

  console.log("2");
  Order.create({
    userInfo: {
      email: req.body.email,
      phone: req.body.phone,
      fname: req.body.fname,
      lname: req.body.lname,
    },
    washerInfo: {
      scented: req.body.scented,
      delicates: req.body.delicates,
      separate: req.body.separate,
      towelsSheets: req.body.towelsSheets,
      prefs: req.body.washerPrefs,
      address: "978 SW 2nd Ave, Gainesville, FL 32601", //default
      email: "w1@gmail.com", //default
      phone: "laundrPhone#", //default
    },
    pickupInfo: {
      prefs: req.body.addressPrefs,
      date: req.body.pickupDate,
      time: req.body.pickupTime,
      driverEmail: "N/A",
    },
    dropoffInfo: {
      date: "N/A",
      time: "N/A",
      driverEmail: "N/A",
    },
    orderInfo: {
      coupon: req.body.coupon,
      status: 0,
      weight: "N/A",
      cost: req.body.cost,
      created: req.body.created,
      address: req.body.address,
      orderID: orderCount + 1,
    },
  })
    .then((order) => {
      if (order) {
        console.log("3");
        return res.json({
          success: true,
          message: "Order successfully created",
          orderID: order.orderInfo.orderID,
        });
      } else {
        console.log("3");
        return res.json({
          success: false,
          message: "Error with creating order",
        });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });

  //todo: in future, handle payment stuff here as well? return false if payment fails, modify error msg on frontend to notify user
};

const getOrders = (req, res) => {
  Order.find({})
    .then((orders) => {
      if (orders) {
        return res.json({ success: true, message: orders });
      } else {
        return res.json({
          success: false,
          message: "Error with fetching orders",
        });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });
};

const getCurrentOrder = async (req, res) => {
  //find the order that isn't cancelled or done, should only ever be one. if more than one, undefined behavior since findOne returns only one
  await Order.findOne({
    "userInfo.email": req.body.userEmail,
    "orderInfo.status": { $nin: [7, 8] },
  })
    .then((order) => {
      if (order) {
        return res.json({
          success: true,
          message: order,
        });
      } else {
        return res.json({
          success: true,
          message: "N/A",
        });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });
};

module.exports = { placeOrder, getOrders, getCurrentOrder };
