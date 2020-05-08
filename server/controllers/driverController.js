const Order = require("../models/Order");

//RETURNS ONLY TERMINATE THE CURRENT FUNCTION YOU DUMMY: aka the .then, catc, etc.
//awaiting on a promise guarantees the .then is executed right after

const assignOrder = async (req, res) => {
  let order_id = "";

  await Order.findOne({ "orderInfo.orderID": req.body.orderID })
    .then(async (order) => {
      /*console.log(
        "this should execute first, but it's last if you don't use await! woooah"
      );*/
      if (order) {
        if (order.pickupInfo.driverEmail === "N/A") {
          order_id = order._id;

          await Order.findByIdAndUpdate(
            order_id,
            {
              "pickupInfo.driverEmail": req.body.driverEmail,
              "orderInfo.status": 1,
            },
            { new: true }
          )
            .then((order) => {
              if (order) {
                return res.json({
                  success: true,
                  message: "Pickup driver assigned successfully",
                });
              } else {
                return res.json({
                  success: false,
                  message: "Error with assigning a pickup driver",
                });
              }
            })
            .catch((error) => {
              return res.json({
                success: false,
                message: error.code,
              });
            });
        } else {
          return res.json({
            success: false,
            message: "Order already has a pickup driver",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Order could not be found",
        });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error.code });
    });
  /*
  console.log(
    "this should execute last, but it's first if you don't await! woooah"
  );*/
};

const updateOrderWeight = async (req, res) => {
  let order_id = "";

  await Order.findOne({ "orderInfo.orderID": req.body.orderID })
    .then(async (order) => {
      if (order) {
        if (order.orderInfo.weight === "N/A") {
          order_id = order._id;

          await Order.findByIdAndUpdate(
            order_id,
            {
              "orderInfo.weight": req.body.weight,
              "orderInfo.status": 2,
            },
            { new: true }
          )
            .then((order) => {
              if (order) {
                return res.json({
                  success: true,
                  message: "Weight entered for order successfully",
                });
              } else {
                return res.json({
                  success: false,
                  message: "Error with entering weight for order",
                });
              }
            })
            .catch((error) => {
              return res.json({
                success: false,
                message: error.code,
              });
            });
        } else {
          return res.json({
            success: false,
            message: "Order already has a weight entered",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Order could not be found",
        });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error.code });
    });
};

module.exports = { assignOrder, updateOrderWeight };
