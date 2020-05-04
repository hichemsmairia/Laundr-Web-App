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
        message: "Error with getting number of total orders",
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
    },
    washerInfo: {
      scented: req.body.scented,
      delicates: req.body.delicates,
      separate: req.body.separate,
      towelsSheets: req.body.towelsSheets,
      washerPrefs: req.body.washerPrefs,
    },
    driverInfo: {
      address: req.body.address,
      addressPrefs: req.body.addressPrefs,
      pickupDate: req.body.pickupDate,
      pickupTime: req.body.pickupTime,
    },
    orderInfo: {
      coupon: req.body.coupon,
      status: 0,
      weight: req.body.weight,
      cost: req.body.cost,
      created: req.body.created,
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
      console.log("4");
      console.log(error);
      return res.json({ success: false, message: error.code });
    });

  //todo: in future, handle payment stuff here as well? return false if payment fails, modify error msg on frontend to notify user
};

module.exports = { placeOrder };
