const Order = require("../models/Order");

const setWasherDone = async (req, res) => {
  let order_id = "";

  await Order.findOne({ "orderInfo.orderID": req.body.orderID })
    .then(async (order) => {
      if (order) {
        if (order.orderInfo.status === 3) {
          order_id = order._id;

          await Order.findByIdAndUpdate(
            order_id,
            {
              "orderInfo.status": 4,
            },
            { new: true }
          )
            .then((order) => {
              if (order) {
                return res.json({
                  success: true,
                  message: "Order successfully marked as done by washer",
                });
              } else {
                return res.json({
                  success: false,
                  message: "Error with marking as done by washer",
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
            message: "Order does not have the correct status",
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

module.exports = { setWasherDone };
