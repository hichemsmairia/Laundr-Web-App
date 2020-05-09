const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  let orderCount;

  /*
  return res.json({
    success: false,
    message: "Testing order fail",
  });*/

  await Order.countDocuments({}, (err, count) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error with getting number of total orders: " + err,
      });
    } else {
      orderCount = count;
    }
  });

  console.log("1");
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
        console.log("2");
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
      return res.json({ success: false, message: error.code });
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
      return res.json({ success: false, message: error.code });
    });
};

module.exports = { placeOrder, getOrders };
