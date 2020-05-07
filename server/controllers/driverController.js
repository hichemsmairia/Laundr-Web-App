const Order = require("../models/Order");

//RETURNS ONLY TERMINATE THE CURRENT FUNCTION YOU DUMMY: aka the .then, catc, etc.
//awaiting on a promise guarantees the .then is executed right after

const assignOrder = async (req, res) => {
  let order_id = "";

  await Order.findOne({ "orderInfo.orderID": req.body.orderID })
    .then(async (order) => {
      console.log(
        "this should execute first, but it's last if you don't use await! woooah"
      );
      if (order) {
        if (order.driverInfo.pickupDriverEmail === "N/A") {
          order_id = order._id;

          await Order.findByIdAndUpdate(
            order_id,
            {
              "driverInfo.pickupDriverEmail": req.body.driverEmail,
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

  console.log(
    "this should execute last, but it's first if you don't await! woooah"
  );
};

module.exports = { assignOrder };
